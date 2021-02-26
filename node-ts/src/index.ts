// Load env vars
import loadEnv from './common/config/env';

loadEnv();
// eslint-disable-next-line import/first
import app from './app';

const port = process.env.PORT;

// Start server
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`**** Server is listening on port ${port} ****`);
});

declare global {
  // eslint-disable-next-line no-unused-vars
  namespace Express {
    export interface Request {
      authUserData: any;
    }
    export interface Response {
      authUserData: any;
    }
  }
}
