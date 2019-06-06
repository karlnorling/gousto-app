import { loadData }  from './loadData';

describe('loadData', () => {
  test('should load data successfully', async () => {
    const recipes = await loadData('./src/data/recipe-data.test.csv');
    expect(recipes.length).toBe(1);
  })
  test('should fail loading data and throw exception - missing file', async () => {
    try {
      await loadData('./bad/path.csv');
    } catch (error) {
      expect(error).toBe(new Error());
    }
  });
  test('should fail loading data and throw exception - file parsing error', async () => {
    const csvFilePath = './src/data/recipe-data.test.bad.csv';
    try {
      await loadData(csvFilePath);
    } catch (error) {
      expect(error).toBe(new Error(`Failed to load data from: ${csvFilePath}. Please check contents of file`));
    }
  });
});