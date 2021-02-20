import { NextFunction, Request, Response, Router } from 'express';

const PingController: Router = Router();

PingController.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).send({ data: 'Pong!' });
    } catch (e) {
      next(e);
    }
  }
);

export default PingController;
