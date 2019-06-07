import { BaseContext } from 'koa';
import { Gousto } from 'src/types/globals';
import { Paginate } from './util/pagination';

const pageSize = 5;
const maxPages = 10;

export default class RecipesController {
  public static async list (ctx: BaseContext) {
    const currentPage = ctx.params.page || 1;
    const totalItems = ctx.data.recipes.length;
    const pagination = new Paginate(totalItems, pageSize, maxPages);
    const chunk = pagination.getChunk(ctx.data.recipes, currentPage);
    const pages = pagination.getPagination(currentPage);

    ctx.body = {
      recipes: chunk,
      pages
    }
  }

  public static async get (ctx: BaseContext) {
    const recipe: Gousto.Recipe = ctx.data.recipes.find((recipe: Gousto.Recipe) => recipe.id === parseInt(ctx.params.id, 10));
    if (recipe) {
      ctx.body = {
        ...recipe
      }
    } else {
      ctx.status = 404;
    }
  }

  public static async put (ctx: BaseContext) {
    const recipe: Gousto.Recipe = ctx.data.recipes.find((recipe: Gousto.Recipe) => recipe.id === parseInt(ctx.params.id, 10));
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