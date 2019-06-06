import { BaseContext } from 'koa';
import { Gousto } from 'src/types/globals';

export default class RecipesController {
  public static async list (ctx: BaseContext) {
    ctx.body = {
      ...ctx.data
    }
  }

  public static async get (ctx: BaseContext) {
    const recipe = ctx.data.recipes.find((recipe: Gousto.Recipe) => recipe.id === parseInt(ctx.params.id, 10));
    if (recipe) {
      ctx.body = {
        ...recipe
      }
    } else {
      ctx.status = 404;
    }
  }

  public static async put (ctx: BaseContext) {
    const recipe = ctx.data.recipes.find((recipe: Gousto.Recipe) => recipe.id === parseInt(ctx.params.id, 10));
    if (recipe) {
      // Get post body
      // Match with Gousto.Recipe properties and update
      // Set updated `recipe` on ctx.data
      // Return ctx.data
      // Write to recipe-data.csv (mapping?)
      ctx.body = {
        ...recipe
      }
    } else {
      ctx.status = 404;
    }
  }
}