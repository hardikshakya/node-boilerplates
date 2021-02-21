import { Request, Response, NextFunction, Router } from 'express';

import { HttpStatus } from '../../../common/constants';
import { logger, succeeded } from '../../../common/helper';

const IndexController: Router = Router();

// App Home Route
IndexController.get('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    return succeeded(res, HttpStatus.OK, 'Welcome to the APP.');
  } catch (error) {
    logger.error(`message - ${error.message}, stack trace - ${error.stack}`);
    next(error);
  }
});

export default IndexController;
