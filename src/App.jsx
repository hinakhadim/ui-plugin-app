import React from 'react';
import UISlot, {  defaultRender, UiPluginsContext } from './plugin-template';
import { getInjectedPlugins } from './utils';

function App() {

  // const enabledPlugins = React.useMemo(() => getInjectedPlugins(), []);
  const enabledPlugins = getInjectedPlugins();
  console.log("=========> enabled Plugins <===========", enabledPlugins);

  const footerContents = [
    {
      id: 'footer-top',
      priority: 1,
      content: <div>Footer Top Section</div>,
    },
    {
      id: 'copyright-site',
      priority: 3,
      content: <span className="copyright-site">Copyright Issue</span>,
    },
    {
      id: 'language-selector',
      priority: 5,
      content: <div>Language Selector</div>,
      hidden: true,
    },
  ];
  
    return (
      <UiPluginsContext.Provider value={[]}>
        <div className="wrapper wrapper-footer">
          <UISlot
            slotId="footer"
            defaultContents={[
              {
                id: 'footer-container',
                priority: 1,
                content: <UISlot slotId="footer-contents" defaultContents={footerContents} renderWidget={defaultRender} />,
              }]}
            renderWidget={(widget) => <footer id="footer" className="tutor-container">{widget.content}</footer>}
          />

        </div>
      </UiPluginsContext.Provider>
    );
 
}

export default App;
