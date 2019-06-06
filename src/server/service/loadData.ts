import * as csv from 'csvtojson';
import { Gousto } from '../../types/globals';

export const loadData = async (csvFilePath: string): Promise<Gousto.Recipe[] | void[]> => {
  console.log(`Attempting to load data from: ${csvFilePath}`);
  try {
    const json = await csv().fromFile(csvFilePath);
    console.log(`Data loaded: ${JSON.stringify(json)}`);
    return json.map((data: any) => {
      const recipe: Gousto.Recipe = {
        id: data.id,
        meta: {
          createdAt: data.created_at,
          updatedAt: data.updated_at,
          goustoReference: parseInt(data.gousto_reference, 10)
        } as Gousto.Meta,
        boxType: data.box_type,
        title: data.title,
        slug: data.slug,
        shortTitle: data.short_title,
        marketingDescription: data.marketing_description,
        bullets: [data.bulletpoint1, data.bulletpoint2, data.bulletpoint3],
        recipeDietType: data.recipe_diet_type_id,
        season: data.season,
        recipeCuisine: data.recipe_cuisine,
        nutrition: {
          caloriesKcal: parseInt(data.calories_kcal, 10),
          proteinGrams: parseInt(data.protein_grams, 10),
          fatGrams: parseInt(data.fat_grams, 10),
          carbsGrams: parseInt(data.carbs_grams, 10),
          originCountry: data.origin_country
        } as Gousto.Nutrition,
        ingredients: {
          inYourBox: data.in_your_box,
          proteinSource: data.protein_source,
          base: data.base
        } as Gousto.Ingredients,
        cooking: {
          preparationTimeMinutes: parseInt(data.preparation_time_minutes, 10),
          shelfLifeDays: parseInt(data.shelf_life_days),
          equipmentNeeded: data.equipment_needed
        } as Gousto.Cooking
      };
      return recipe;
    }).filter((recipe: Gousto.Recipe) => !!recipe);
  } catch (error) {
    console.error(`Failed to load data from: ${csvFilePath}`, error);
  }
};

