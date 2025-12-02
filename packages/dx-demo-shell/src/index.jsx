import * as React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import PropTypes from "prop-types";
import {
  HashRouter,
  MemoryRouter,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import { DemoViewer } from "./demo-viewer/demo-viewer";
import { SectionsViewer } from "./demo-viewer/sections-viewer";
import { EmbeddedDemoContext } from "./context";

const App = ({
  router = "memory",
  path = undefined,
  scriptPath = "/dist/index.js",
  showThemeSelector = false,
  showThemeVariants = false,
  defaultTab = "preview",
  ...restProps
}) => {
  const Router = router === "hash" ? HashRouter : MemoryRouter;
  const contextValue = {
    ...restProps,
    scriptPath,
    showThemeSelector,
    showThemeVariants,
    defaultTab
  };

  return (
    <EmbeddedDemoContext.Provider value={contextValue}>
      <Router initialEntries={path ? [path] : undefined}>
        <Switch>
          <Route path="/demo/:sectionName/:demoName" component={DemoViewer} />
          <Route path="/section" component={SectionsViewer} />
          <Redirect from="/" to="/section" />
        </Switch>
      </Router>
    </EmbeddedDemoContext.Provider>
  );
};

App.propTypes = {
  router: PropTypes.string,
  path: PropTypes.string,
  scriptPath: PropTypes.string,
  showThemeSelector: PropTypes.bool,
  showThemeVariants: PropTypes.bool,
  defaultTab: PropTypes.string
};

export const initialize = ({
  themeSources,
  migrationSamples,
  demoSources,
  renderDemo,
  unmountDemo,
  themeComponents,
  demoData
}) => {
  const embeddedDemoPlaceholders = [
    ...document.getElementsByClassName("embedded-demo")
  ];
  const embeddedDemoConfigs = embeddedDemoPlaceholders.map(placeholder => ({
    options: JSON.parse(placeholder.getAttribute("data-options") || "{}"),
    placeholder
  }));
  embeddedDemoConfigs.forEach(config => {
    render(
      <App
        {...config.options}
        themeComponents={themeComponents}
        demoData={demoData}
        themeSources={themeSources}
        demoSources={demoSources}
        migrationSamples={migrationSamples}
        renderDemo={renderDemo}
        unmountDemo={unmountDemo}
      />,
      config.placeholder
    );
  });

  window.deinitializeDemos = () => {
    embeddedDemoPlaceholders.forEach(placeholder =>
      unmountComponentAtNode(placeholder)
    );
  };
};
