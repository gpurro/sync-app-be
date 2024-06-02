import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sync API',
      version: '1.0.0',
      description: 'API documentation for Sync App',
    },
  },
  apis: ['./src/presentation/routers/**/*.ts'], // Path to the API routes
};
export const swaggerSpec = swaggerJsdoc(options);
