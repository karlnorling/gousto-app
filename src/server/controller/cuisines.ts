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
    const recipes: Gousto.Recipe[] = ctx.data.recipes
      .filter((recipe: Gousto.Recipe) => recipe.recipeCuisine === ctx.params.type)
      .filter((recipe: Gousto.Recipe) => !!recipe);
    if (recipes) {
      const baseRecipes: Gousto.BaseRecipe[] = recipes.map((recipe: Gousto.Recipe) => {
        return {
          id: recipe.id,
          title: recipe.title,
          marketingDescription: recipe.marketingDescription
        }
      });
      const cuisines: Gousto.Cuisine = {
        name: ctx.params.type,
        recipes: baseRecipes
      };
      ctx.body = {
        ...cuisines
      }
    } else {
      ctx.status = 404;
    }
  }
}