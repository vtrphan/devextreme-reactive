# React 19 Migration Handoff: DevExpress Packages (`@vtrphan/dx-react-*`)

**Target Audience:** AI Agent assigned to the cloned DevExpress repository.
**Objective:** Refactor the legacy DevExpress React components to be fully compatible with React 19, allowing the main frontend application to upgrade safely.

## Context

The main frontend application is upgrading to React 19. The legacy `dx-react-core`, `dx-react-grid`, and `dx-react-chart` packages contain older React patterns that have been officially removed in React 19 and will cause the application to crash. You have full control over the cloned repository to patch these issues.

**Official React Migration Guide:** Thoroughly review the official React 19 upgrade guide here: https://react.dev/blog/2024/04/25/react-19-upgrade-guide

## Required Tasks (In Order of Priority)

### 1. Eliminate `defaultProps` on Function Components (CRITICAL)

React 19 has completely removed support for `defaultProps` on function components.

- **Action:** Scan the entire repository for `ClassName.defaultProps = { ... }` attached to function components.
- **Fix:** Refactor these to use ES6 default function parameters directly inside the component signature.
- _Note: `defaultProps` on Class components will still work, but ES6 defaults are preferred if you are refactoring._

### 2. Remove String Refs (CRITICAL)

React 19 completely removes support for string refs (e.g., `<div ref="myContainer" />`).

- **Action:** Search for any instances of `ref="[string]"` and `this.refs.[string]`.
- **Fix:** Convert them to `React.createRef()` (for class components) or callback refs.

### 3. Eliminate Legacy Context API (CRITICAL)

React 19 removes the legacy Context API (`childContextTypes`, `getChildContext`).

- **Action:** Search the codebase for `childContextTypes`.
- **Fix:** If found, the context architecture must be rewritten to use the modern `React.createContext()` API.

### 4. Refactor `forwardRef` (Recommended)

In React 19, `ref` can be passed as a regular prop. `forwardRef` is deprecated.

- **Action:** Find usages of `React.forwardRef`.
- **Fix:** Refactor the component to accept `ref` directly as a prop: `function MyComponent({ ref, ...props })` and remove the `forwardRef` wrapper. (This removes deprecation warnings in Strict Mode).

### 5. Update Peer Dependencies

- **Action:** Update the `package.json` of all `dx-react-*` workspaces.
- **Fix:** Change the `peerDependencies` for `react` and `react-dom` to support React 19 (e.g., `"react": "^18.0.0 || ^19.0.0"`).

### 6. MUI Framework Compatibility (`dx-react-grid-material-ui` / `dx-react-chart-material-ui`)

The main project uses the latest version of `@mui/material` (v6/v7) and is planning a migration to v9. The legacy DevExpress UI packages were likely built for an older version of Material-UI (v4 or v5) and need to be modernized to support the latest MUI infrastructure.

- **Migration Guide:** Thoroughly review the official MUI v9 migration guide here: https://mui.com/material-ui/migration/upgrade-to-v9/
- **Imports:** Ensure all imports use the modern `@mui/material` and `@mui/icons-material` paths rather than the legacy `@material-ui/core`.
- **Styling Engine:** If the legacy code relies heavily on `withStyles` or `makeStyles` from `@mui/styles`, consider refactoring them to use the modern `styled()` API or the `sx` prop, as `@mui/styles` is deprecated and strictly relies on legacy React context.
- **Component Props:** Check for deprecated MUI props (e.g., specific `variant` or `color` values on Buttons, TextFields, and Typography) and update them to the latest MUI specifications as noted in the migration guide.
- **Peer Dependencies:** Update `peerDependencies` in the material-ui specific packages to require the latest `@mui/material` version (e.g., `"@mui/material": ">=9.0.0"`).

## Verification

- Ensure that the TypeScript compiler (`tsc`) passes with the updated `@types/react` for v19.
- Specifically watch out for stricter `useRef` typings (must provide initial value like `null`) and changes to implicit `children` types.
- Once patched, prepare the packages to be published or linked back to the main `admin-portal-v3-fe` project.
