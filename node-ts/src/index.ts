// Load env vars
import loadEnv from './common/config/env';

loadEnv();
// eslint-disable-next-line import/first
import app from './app';

const port = process.env.PORT;

// Start server
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`**** Server is listening on port ${port} ****`));
