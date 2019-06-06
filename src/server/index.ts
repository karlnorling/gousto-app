import * as Koa from 'koa';
import * as helmet from 'koa-helmet';
import * as cors from '@koa/cors';
import * as bodyParser from 'koa-body';
import * as Router from 'koa-router';

import { Gousto } from '../types/globals';

//import { router } from './routes/index';
import { loadData } from './service/loadData';
import { getRoutes } from './routes/index';
import { runInNewContext } from 'vm';

const app = new Koa();
const router = new Router();

const port = 3003; // Move to .env.local
const csvFilePath = './src/data/recipe-data.csv'; // Move to .env.local

const routerResult = getRoutes(router);

const startAndLoad = async () => {
  const recipes: Gousto.Recipe[] | void[] = await loadData(csvFilePath);

  // Provides important security headers to make your app more secure
  app.use(helmet());

  // Enable cors with default options
  app.use(cors());

  // Enable bodyParser with default options
  app.use(bodyParser());

  app.use(async (ctx, next) => {
    ctx.data = {
      recipes
    };
    next();
  });

  app.use(routerResult.routes()).use(routerResult.allowedMethods());

  app.listen(port);

  console.log(`Server running on port ${port}`);
}

// This starts the app and loads the data
startAndLoad();
