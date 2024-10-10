import swaggerAutogen from 'swagger-autogen';
import fs from 'fs';
import path from 'path';

const routeDir = './routes';
const readFilePath = fs.readdirSync(routeDir);

const outputFile = 'swagger_output.json';

const routes = readFilePath.map(file => path.join(routeDir, file));

const doc = {
  info: {
    title: 'Narrify API Docs',
    description: 'Narrify API Swagger Documentation',
  },
};

swaggerAutogen()(outputFile, routes, doc);
