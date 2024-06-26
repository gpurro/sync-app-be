import path from 'path';

interface IPlugin {
  name: string;
  packageName: string;
  isRelative?: boolean;
  instance?: any;
  options?: any;
}

export class PluginManager {
  private pluginList: Map<string, IPlugin>;
  private path: string;

  constructor(path: string) {
    this.pluginList = new Map();
    this.path = path;
  }

  private pluginExists(name: string): boolean {
    return this.pluginList.has(name);
  }

  private addPlugin(plugin: IPlugin, packageContents: any): void {
    this.pluginList.set(plugin.name, { ...plugin, instance: packageContents });
  }

  async registerPlugin(plugin: IPlugin): Promise<void> {
    if (!plugin.name || !plugin.packageName) {
      throw new Error('The plugin name and package are required');
    }

    if (this.pluginExists(plugin.name)) {
      throw new Error(`Cannot add existing plugin ${plugin.name}`);
    }

    try {
      // Try to load the plugin
      // const packageContents = plugin.isRelative ? requireModule(path.join(this.path, plugin.packageName)) : requireModule(plugin.packageName) ;
      const packageContents = plugin.isRelative ? await import(path.join(this.path, plugin.packageName)) : await import(plugin.packageName) ;
      this.addPlugin(plugin, packageContents);
    } catch (error) {
      console.log(`Cannot load plugin ${plugin.name}`, error);
    }
  }

  loadPlugin<T>(name: string): T {
    const plugin = this.pluginList.get(name);
    if (!plugin) {
      throw new Error(`Cannot find plugin ${name}`);
    }
    plugin.instance.default.prototype.options = plugin.options;
    plugin.instance.default.prototype.pluginManager = this;
    return Object.create(plugin?.instance.default.prototype) as T;
  }

  listPluginList(): Map<string, IPlugin> {
    return this.pluginList;
  }
}