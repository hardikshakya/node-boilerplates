import { Request, Response, NextFunction, Router } from 'express';

import { HttpStatus } from '../../../common/constants';

const IndexController: Router = Router();

// App Home Route
IndexController.get('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(HttpStatus.OK).json({ data: 'Welcome to the APP.' });
  } catch (error) {
    next(error);
  }
});

export default IndexController;
