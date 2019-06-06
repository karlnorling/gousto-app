import * as controller from '../controller/index';

// RECIPES ROUTES
export const recipesRoutes = (router) => {
  router.get('/recipes', controller.recipes.list);
  router.get('/recipes/:id', controller.recipes.get);
  return router;
}