import express, { Router, Response, Request, NextFunction } from 'express';
import http from 'http';
import path from 'path';
import { swaggerSpec } from '../infrastructure/swagger';
import swaggerUi from 'swagger-ui-express';
import { allowCORS } from './middleware/allow-cors.middleware';

interface ConfigurationOptions {
  port: number;
  publicPath: string;
  router: Router;
}

export class AppServer {

  public readonly app = express();

  private serverListener?: http.Server;
  private readonly port: number;
  private readonly publicPath: string;
  private readonly router: Router;

  constructor(configurationOptions: ConfigurationOptions){
    this.port = configurationOptions.port;
    this.publicPath = configurationOptions.publicPath;
    this.router = configurationOptions.router;
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

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on port ${ this.port }`);
    });    
  }

  public close() {
    this.serverListener?.close();
  }

}