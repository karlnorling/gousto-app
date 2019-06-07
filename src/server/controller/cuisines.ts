import { BaseContext } from 'koa';
import { Gousto } from 'src/types/globals';
import { Paginate } from './util/pagination';

const pageSize = 2;
const maxPages = 10;

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

    const currentPage = ctx.params.page || 1;
    const totalItems = recipes.length;
    const pagination = new Paginate(totalItems, pageSize, maxPages);
    const chunk = pagination.getChunk(recipes, currentPage);
    const pages = pagination.getPagination(currentPage);

    if (recipes) {
      const baseRecipes: Gousto.BaseRecipe[] = chunk.map((recipe: Gousto.Recipe) => {
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
        cuisines,
        pages
      }
    } else {
      ctx.status = 404;
    }
  }
}