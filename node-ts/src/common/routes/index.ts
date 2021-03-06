import { Application, Router } from 'express';

import IndexController from '../../api/v1/controllers/index.controller';
import PingController from '../../api/v1/controllers/ping.controller';
import AuthController from '../../api/v1/controllers/auth.controller';
import PostController from '../../api/v1/controllers/post.controller';

const routesV1Api: [string, Router][] = [
  ['/api/v1', IndexController],
  ['/api/v1/ping', PingController],
  ['/api/v1/auth', AuthController],
  ['/api/v1/posts', PostController],
];

export default (app: Application) => {
  routesV1Api.forEach((route) => {
    const [url, controller] = route;

    app.use(url, controller);
  });
};
