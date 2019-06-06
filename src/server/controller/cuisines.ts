import { BaseContext } from 'koa';
import { Gousto } from 'src/types/globals';

export default class CuisinesController {
  public static async list (ctx: BaseContext) {
    const cuisines = [...new Set(ctx.data.recipes.map((recipe: Gousto.Recipe) => recipe.recipeCuisine))];
    ctx.body = {
      cuisines
    }
  }

  public static async get (ctx: BaseContext) {
    const recipes = ctx.data.recipes.find((recipe: Gousto.Recipe) => recipe.recipeCuisine === ctx.params.type);
    const cuisines: Gousto.Cuisine = {
      name: ctx.params.type,
      recipes
    };

    if (cuisines) {
      ctx.body = {
        ...cuisines
      }
    } else {
      ctx.status = 404;
    }
  }
}