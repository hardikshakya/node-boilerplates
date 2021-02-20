import { Application, Router } from 'express';

import IndexController from '../../api/v1/controllers/index.controller';

const routesV1Api: [string, Router][] = [['/api/v1', IndexController]];

export default (app: Application) => {
  routesV1Api.forEach((route) => {
    const [url, controller] = route;

    app.use(url, controller);
  });
};
