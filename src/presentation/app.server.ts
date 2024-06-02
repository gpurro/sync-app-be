import express, { Router, Response, Request, NextFunction } from 'express';
import http from 'http';
import path from 'path';
import { swaggerSpec } from '../infrastructure/swagger';
import swaggerUi from 'swagger-ui-express';

interface ConfigurationOptions {
  port: number;
  publicPath: string;
  router: Router;
  swagger: { enabled: boolean };
}

export class AppServer {

  public readonly app = express();

  private serverListener?: http.Server;
  private readonly port: number;
  private readonly publicPath: string;
  private readonly router: Router;
  private readonly swagger: { enabled: boolean };

  constructor(configurationOptions: ConfigurationOptions){
    this.port = configurationOptions.port;
    this.publicPath = configurationOptions.publicPath;
    this.router = configurationOptions.router;
    this.swagger = configurationOptions.swagger;
  }

  async start() {

    //* Middleware
    this.app.use(express.json()); // raw
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded

    //* Public Folder
    this.app.use(express.static(this.publicPath));


    //* Set CORS
    this.app.use(this.allowCORS);
    
    //* Set Router
    this.app.use(this.router);

    this.swagger.enabled && this.enableSwagger();

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

  private allowCORS(req: Request, res: Response, next: NextFunction) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  }; 

  private enableSwagger() {

    // Swagger Page
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    
    // Documentation in JSON format
    this.app.get('/docs.json', (req, res) => {
      res.setHeader('Content-Type', 'application/json')
      res.send(swaggerSpec)
    })
  }

}