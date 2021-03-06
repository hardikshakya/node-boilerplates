import app from './app';
import { User } from './common/models';

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
      authUserData: User;
    }
    export interface Response {
      authUserData: User;
    }
  }
}
