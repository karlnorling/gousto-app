import { loadData }  from './loadData';

const csvFilePath = './src/data/recipe-data.test.csv';

describe('loadData', () => {
  test('should load data successfully', async () => {
    const recipes = await loadData(csvFilePath);
    expect(recipes.length).toBe(1);
  })
});