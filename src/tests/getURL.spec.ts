import { test, expect } from '@playwright/test';
import * as utlity from '../utils/common-utlity'
import { GenericFunctions } from '../utils/generic-functions'

let baseURL: string;
let genericFunctions: GenericFunctions;

test.beforeEach(async () => {
  baseURL = await utlity.getUrl('loginPage')
});

test('get started link', async ({ page }) => {
  await page.goto(baseURL);

  genericFunctions = new GenericFunctions(page);
  let pageTitle = await genericFunctions.getPageTitle();
  let url = await genericFunctions.getPageURL();

  console.log(pageTitle);
  console.log(url);
  
  await page.waitForTimeout(2000);

});
