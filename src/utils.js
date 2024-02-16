import packageJson from '../package.json';

// eslint-disable-next-line import/prefer-default-export
export const getPluginPackageNames = () => {
    const dependencies = packageJson['dependencies'];
    return Object.keys(dependencies).filter(packageName => packageName.startsWith('@openedx-plugins/'))
};

export const getInjectedPlugins = async () => {
    // eslint-disable-next-line react/jsx-filename-extension
    console.log('----------><---------', getPluginPackageNames());

    console.log('helllo -----> ', 
        await import('@openedx-plugins/footer-links').then(res => res.default).catch(err => console.error(err)));

    const pluginObjects = getPluginPackageNames().map(async (plugin) => {
        console.log('pluginiNmae', plugin);
        let ress = await  import(plugin).then(module => {
            console.log("===mode===", module.default);
           return module.default;
        }).catch(err => console.error(err));
        console.log("-=======res======-", ress);
        return ress;
    });
    const allPluginsData = await Promise.all(pluginObjects);
    console.log('-----------plugin names------------', pluginObjects, allPluginsData);
    //   return pluginObjects;
    return [];
};