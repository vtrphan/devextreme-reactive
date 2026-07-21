import * as React from 'react';
import PropTypes from 'prop-types';
import { getParameters } from 'codesandbox/lib/api/define';
import './codesandbox-button.css';

const indexCode = `import React from "react";
import { createRoot } from "react-dom/client";
import Demo from "./demo";

const root = createRoot(document.getElementById("root"));
root.render(<Demo />);
`;
// prevent Potential infinite loop error in virtual table demos (100k rows)
const sandboxConfig = `{
  "infiniteLoopProtection": false,
  "hardReloadOnChange": false,
  "view": "browser"
}`;

export const CodeSandBoxButton = ({
  code, sandboxHtml, helperFiles, externalDeps, requireTs,
}) => {
  const helpers = Object.entries(helperFiles).reduce((acc, [name, content]) => ({
    ...acc,
    [name]: { content },
  }), {});

  const ext = requireTs ? 'tsx' : 'js';
  const devDeps = requireTs
    ? { devDependencies: { typescript: 'latest' } }
    : {};

  const parameters = getParameters({
    files: {
      'package.json': {
        content: {
          dependencies: {
            'react-dom': '^19.0.0',
            'react': '^19.0.0',
            ...externalDeps,
          },
          ...devDeps,
        },
      },
      [`index.${ext}`]: {
        content: indexCode,
      },
      [`demo.${ext}`]: {
        content: code,
      },
      'index.html': {
        content: sandboxHtml,
      },
      'sandbox.config.json': {
        content: sandboxConfig,
      },
      ...helpers,
    },
  });

  return (
    <form action="https://codesandbox.io/api/v1/sandboxes/define" method="POST" target="_blank">
      <input type="hidden" name="parameters" value={parameters} />
      <input type="submit" value="Open in CodeSandbox" className="btn-outline-primary codesandbox-button" />
    </form>
  );
};

CodeSandBoxButton.propTypes = {
  code: PropTypes.string.isRequired,
  sandboxHtml: PropTypes.string.isRequired,
  helperFiles: PropTypes.array.isRequired,
  externalDeps: PropTypes.array.isRequired,
  requireTs: PropTypes.bool.isRequired,
};
