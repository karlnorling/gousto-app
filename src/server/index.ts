import * as Koa from 'koa';
import * as helmet from 'koa-helmet';
import * as cors from '@koa/cors';
import * as bodyParser from 'koa-bodyparser';
import { Gousto } from '../types/globals';

import { routes } from './routes/index';
import { loadData } from './service/loadData';

const app = new Koa();
const port = 3003;

const startAndLoad = async () => {
  const recipes: Gousto.Recipe[] | void[] = await loadData();

  // Provides important security headers to make your app more secure
  app.use(helmet());

  // Enable cors with default options
  app.use(cors());

  // Enable bodyParser with default options
  app.use(bodyParser());

  app.use(async ctx => {
    ctx.data = {
      recipes
    };
    ctx.body = 'Hello World';
  });
  app.listen(port);

  console.log(`Server running on port ${port}`);
}

// This starts the app and loads the data
startAndLoad();
