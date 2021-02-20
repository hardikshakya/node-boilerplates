import express, { Application, Request, Response } from 'express';

// Load HTTP status
import { HttpStatus } from './common/constants';
// Load env vars
import loadEnv from './common/config/env';

loadEnv();

// Boot express
const app: Application = express();
const port = process.env.PORT;

// Application routing
app.use('/', (req: Request, res: Response) => {
  res.status(HttpStatus.OK).send({ data: 'Hello, Hardik Here :)' });
});

// Start server
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Server is listening on port ${port}!`));
