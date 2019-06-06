import * as controller from '../controller/index';

// CUISINES ROUTES
export const cuisinesRoutes = (router) => {
  router.get('/cuisines', controller.cuisines.list);
  router.get('/cuisines/:type', controller.cuisines.get);
  return router;
}