module.exports = function transformer(file, api) {
  const j = api.jscodeshift;
  const isSkippableFile = file.path.includes('.test.')
    || file.path.includes('.stories.')
    || file.path.includes('/demos/')
    || file.path.includes('/demo-')
    || file.path.includes('/docs/')
    || file.path.includes('/theme-')
    || file.path.includes('/dx-site/');

  if (isSkippableFile) {
    return null;
  }

  const root = j(file.source);
  let modified = false;

  const getPropName = (node) => {
    if (!node) return null;
    if (node.type === 'Identifier') return node.name;
    if (node.type === 'StringLiteral' || node.type === 'Literal') return node.value;
    return null;
  };

  const findComponentParamPattern = (componentName) => {
    const varDecl = root
      .find(j.VariableDeclarator, { id: { type: 'Identifier', name: componentName } })
      .nodes()[0];
    if (varDecl && varDecl.init) {
      if (varDecl.init.type === 'ArrowFunctionExpression' || varDecl.init.type === 'FunctionExpression') {
        const [firstParam] = varDecl.init.params;
        if (firstParam && firstParam.type === 'ObjectPattern') {
          return firstParam;
        }
      }
      if (varDecl.init.type === 'CallExpression') {
        // unwrap simple HOCs like React.memo(() => ...)
        const fnArg = varDecl.init.arguments && varDecl.init.arguments.find(arg => (
          arg.type === 'ArrowFunctionExpression' || arg.type === 'FunctionExpression'
        ));
        if (fnArg && fnArg.params[0] && fnArg.params[0].type === 'ObjectPattern') {
          return fnArg.params[0];
        }
      }
    }

    const funcDecl = root
      .find(j.FunctionDeclaration, { id: { type: 'Identifier', name: componentName } })
      .nodes()[0];
    if (funcDecl) {
      const [firstParam] = funcDecl.params;
      if (firstParam && firstParam.type === 'ObjectPattern') {
        return firstParam;
      }
    }

    return null;
  };

  root.find(j.AssignmentExpression, {
    operator: '=',
    left: {
      type: 'MemberExpression',
      property: {
        type: 'Identifier',
        name: 'defaultProps',
      },
    },
  }).forEach((path) => {
    const assignment = path.node;
    const { left, right } = assignment;
    if (!left || left.computed || left.object.type !== 'Identifier') {
      return;
    }
    if (!right || right.type !== 'ObjectExpression') {
      return;
    }

    const componentName = left.object.name;
    const paramPattern = findComponentParamPattern(componentName);
    if (!paramPattern) {
      return;
    }

    const defaultsMap = new Map();
    let unsupportedProperty = false;
    right.properties.forEach((property) => {
      if (unsupportedProperty) return;
      const isObjectProperty = property.type === 'ObjectProperty' || property.type === 'Property';
      if (!isObjectProperty || property.computed) {
        unsupportedProperty = true;
        return;
      }
      const keyName = getPropName(property.key);
      if (!keyName) {
        unsupportedProperty = true;
        return;
      }
      defaultsMap.set(keyName, property.value);
    });

    if (unsupportedProperty) {
      return;
    }

    const assignmentStatement = j(path).closest(j.ExpressionStatement);

    if (!defaultsMap.size && assignmentStatement.size()) {
      assignmentStatement.remove();
      modified = true;
      return;
    }

    const handled = new Set();

    paramPattern.properties = paramPattern.properties.map((propNode) => {
      const isObjectProperty = propNode.type === 'ObjectProperty' || propNode.type === 'Property';
      if (!isObjectProperty || propNode.computed) {
        return propNode;
      }
      const keyName = getPropName(propNode.key);
      if (!defaultsMap.has(keyName)) {
        return propNode;
      }
      handled.add(keyName);
      if (propNode.value.type === 'AssignmentPattern') {
        return propNode;
      }
      const defaultValue = defaultsMap.get(keyName);
      const assignmentPatternNode = j.assignmentPattern(propNode.value, defaultValue);
      const updatedProp = j.objectProperty(propNode.key, assignmentPatternNode);
      updatedProp.shorthand = propNode.shorthand;
      return updatedProp;
    });

    if (handled.size === defaultsMap.size && assignmentStatement.size()) {
      assignmentStatement.remove();
      modified = true;
    }
  });

  if (modified) {
    return root.toSource({ quote: 'single' });
  }
  return null;
};
