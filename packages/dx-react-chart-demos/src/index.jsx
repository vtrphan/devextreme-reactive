import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { initialize } from '@vtrphan/dx-demo-shell';
import '@vtrphan/dx-demo-shell/dist/index.css';
import { demos, migrationSamples } from './demo-registry.js';
import { themes } from './theme-registry.js';
import { themeComponents } from './theme-components-registry.js';
import { demoData } from './demo-data-registry.js';
import './index.css';

initialize({
  demoSources: demos,
  migrationSamples,
  themeSources: themes,
  themeComponents,
  demoData,
  renderDemo: ({
    element,
    demo: Demo,
    demoContainer,
  }) => {
    const DemoContainer = demoContainer || 'div';
    if (!element._reactRoot) {
      element._reactRoot = createRoot(element);
    }
    element._reactRoot.render(
      (
        <React.StrictMode>
          <DemoContainer>
            <Demo />
          </DemoContainer>
        </React.StrictMode>
      ),
    );
  },
  unmountDemo: ({
    element,
  }) => {
    if (element._reactRoot) { element._reactRoot.unmount(); delete element._reactRoot; }
  },
});
