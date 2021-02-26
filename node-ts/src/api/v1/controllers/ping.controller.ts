import { NextFunction, Request, Response, Router } from 'express';

import { tokenGuard } from '../middlewares/token-guard';
import { HttpStatus } from '../../../common/constants';
import { logger, succeeded } from '../../../common/helper';

const PingController: Router = Router();

PingController.get(
  '/',
  tokenGuard(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return succeeded(res, HttpStatus.OK, 'Pong!');
    } catch (error) {
      logger.error(`message - ${error.message}, stack trace - ${error.stack}`);
      next(error);
    }
  }
);

export default PingController;
