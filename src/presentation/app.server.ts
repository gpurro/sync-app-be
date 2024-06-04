import express, { Router, Response, Request, NextFunction } from 'express';
import http from 'http';
import path from 'path';
import { allowCORS } from './middleware/allow-cors.middleware';
import { PluginManager } from 'infrastructure/plugin-manager';
import { DataSourceManagerPluginType, EntityManagerPluginType } from '@plugin-types';

interface IConfigurationOptions {
  port: number;
  publicPath: string;
  router: Router;
  pluginManager: PluginManager;
}

export class AppServer {

  public readonly app = express();

  private serverListener?: http.Server;
  private readonly port: number;
  private readonly publicPath: string;
  private readonly router: Router;
  public readonly pluginManager: PluginManager;

  constructor(configurationOptions: any){
    this.port = configurationOptions.port;
    this.publicPath = configurationOptions.publicPath;
    this.router = configurationOptions.router;
    this.pluginManager = configurationOptions.pluginManager;
  }

  async start() {

    //* Middleware
    this.app.use(express.json()); // raw
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded

    //* Public Folder
    this.app.use(express.static(this.publicPath));


    //* Set CORS
    this.app.use(allowCORS);
    
    //* Set Router
    this.app.use(this.router);

    //* SPA
    this.app.get('*', (req, res) => {
      const indexPath = path.join( __dirname + `../../../${ this.publicPath }/index.html` );
      res.sendFile(indexPath);
    });    

    // register plugins
    await this.registerPlugins();

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on port ${ this.port }`);
    });    
  }

  public close() {
    this.serverListener?.close();
  }

  private async registerPlugins(): Promise<void> { 
    
    await this.pluginManager.registerPlugin({
      name: 'PlanningCenter.DataSourceManager',
      packageName: '/data-sources/planning-center.data-source-manager',
      isRelative: true,
    });

    await this.pluginManager.registerPlugin({
      name: 'PlanningCenter.Groups.EntityManager',
      packageName: '/entities/pc-groups.entity-manager',
      isRelative: true,
    });    

    // Load the plugin
    const dataSourceManagerPlugin = this.pluginManager.loadPlugin<DataSourceManagerPluginType>('PlanningCenter.DataSourceManager');
    const entityManagerPlugin = this.pluginManager.loadPlugin<EntityManagerPluginType>('PlanningCenter.Groups.EntityManager');
    

  }

}