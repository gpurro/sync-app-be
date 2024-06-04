
export abstract class DataSourceManagerPluginType {

  public apiConnection: any;
  
  public options: any;
  public pluginManager: any  // the instance of the plugin manager to let the plugin call other plugins
}