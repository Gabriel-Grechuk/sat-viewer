import express from 'express';

import * as routes from './routes';

const app = express();

app.get('/', routes.index);

export default {
  app,
};
