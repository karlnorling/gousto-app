export namespace Gousto {
  export interface Recipe {
    id: number;
    meta: Meta;
    boxType: string;
    title: string;
    slug: string;
    shortTitle: string;
    marketingDescription: string;
    bullets: string[];
    recipeDietType: string;
    season: string;
    recipeCuisine: string;
    nutrition: Nutrition;
    ingredients: Ingredients;
    cooking: Cooking;
  }

  export interface Meta {
    createdAt: string;
    updatedAt: string;
    goustoReference: number;
  }

  export interface Nutrition {
    caloriesKcal: number;
    proteinGrams: number;
    fatGrams: number;
    carbsGrams: number;
    originCountry: string;
  }

  export interface Ingredients {
    inYourBox: string;
    proteinSource: string;
    base: string;
  }
  
  export interface Cooking {
    preparationTimeMinutes: number;
    shelfLifeDays: number;
    equipmentNeeded: string;
  }
}