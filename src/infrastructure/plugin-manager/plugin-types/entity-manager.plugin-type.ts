
export abstract class EntityManagerPluginType {

  public options: any;
  public pluginManager: any  // the instance of the plugin manager to let the plugin call other plugins

  abstract initializeRecords():void;
}