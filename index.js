const packageMap = Object.freeze({
  core: "./packages/dx-react-core",
  grid: "./packages/dx-react-grid",
  chart: "./packages/dx-react-chart",
  scheduler: "./packages/dx-react-scheduler"
});

/**
 * Entry point for the DevExtreme Reactive monorepo package.
 * Consumers should import the individual workspace packages listed in `packageMap`.
 */
export const devextremeReactivePackages = packageMap;

export default devextremeReactivePackages;
