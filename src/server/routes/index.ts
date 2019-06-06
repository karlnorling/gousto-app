import { recipesRoutes } from './recipes'
import { cuisinesRoutes } from './cuisines'

// Not pretty - need better way to combine routes.
export const getRoutes = (router) => cuisinesRoutes(recipesRoutes(router));