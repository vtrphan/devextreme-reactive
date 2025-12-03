/* eslint-disable no-console */
const { execSync } = require('child_process');
const {
  readFileSync, writeFileSync, readdirSync, existsSync,
} = require('fs');
const { join } = require('path');

const rootDir = join(__dirname, '..');
const packagesDir = join(rootDir, 'packages');

const run = (command) => {
  console.log(`\n$ ${command}`);
  execSync(command, { stdio: 'inherit', cwd: rootDir });
};

const runAndCapture = command => execSync(command, { cwd: rootDir, stdio: 'pipe' })
  .toString()
  .trim();

const ensureCleanWorkingTree = () => {
  const status = runAndCapture('git status --porcelain');
  if (status) {
    throw new Error(
      'Working tree is not clean. Commit or stash changes before releasing.',
    );
  }
};

const loadJSON = path => JSON.parse(readFileSync(path, 'utf8'));
const saveJSON = (path, data) => writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`);

const getPackageJsonPaths = () => {
  const results = new Set([join(rootDir, 'package.json')]);
  const queue = [packagesDir];
  const skipDirs = new Set(['node_modules', 'dist', 'build', 'tmp']);

  while (queue.length) {
    const currentDir = queue.pop();
    readdirSync(currentDir, { withFileTypes: true }).forEach((entry) => {
      if (!entry.isDirectory()) {
        return;
      }
      if (skipDirs.has(entry.name)) {
        return;
      }
      const dirPath = join(currentDir, entry.name);
      const candidate = join(dirPath, 'package.json');
      if (existsSync(candidate)) {
        results.add(candidate);
      }
      queue.push(dirPath);
    });
  }

  return Array.from(results);
};

const updateVersionReferences = (targetVersion) => {
  const paths = getPackageJsonPaths();
  const updated = [];

  paths.forEach((path) => {
    const data = loadJSON(path);
    let changed = false;

    if (data.version && data.version !== targetVersion) {
      data.version = targetVersion;
      changed = true;
    }

    [
      'dependencies',
      'devDependencies',
      'peerDependencies',
      'optionalDependencies',
    ].forEach((sectionName) => {
      const section = data[sectionName];
      if (!section || typeof section !== 'object') {
        return;
      }
      Object.entries(section).forEach(([depName, range]) => {
        if (typeof range !== 'string') {
          return;
        }
        if (!depName.startsWith('@vtrphan/')) {
          return;
        }
        const match = range.match(/^(\^|~)?(\d+\.\d+\.\d+)$/);
        if (!match) {
          return;
        }
        const prefix = match[1] || '';
        const current = match[2];
        if (current === targetVersion) {
          return;
        }
        section[depName] = `${prefix}${targetVersion}`;
        changed = true;
      });
    });

    if (changed) {
      saveJSON(path, data);
      updated.push(path.replace(`${rootDir}/`, ''));
    }
  });

  if (updated.length) {
    console.log('Updated version references in:');
    updated.forEach(file => console.log(` - ${file}`));
  } else {
    console.log('Version references already aligned.');
  }
};

const main = async () => {
  if (!process.env.NODE_AUTH_TOKEN) {
    throw new Error('NODE_AUTH_TOKEN must be set to publish packages.');
  }

  ensureCleanWorkingTree();

  run('npx lerna version patch --yes --no-commit-hooks --no-push');
  const { version } = loadJSON(join(rootDir, 'lerna.json'));

  updateVersionReferences(version);

  const statusAfterAlign = runAndCapture('git status --porcelain');
  if (statusAfterAlign) {
    run('git add package.json lerna.json packages');
    run('git commit --amend --no-edit');
    run(`git tag -f v${version}`);
  }

  run('yarn build');
  run('yarn test');
  run('npx lerna publish from-package --yes --no-verify-access');
  run('git push origin master --tags');
};

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
