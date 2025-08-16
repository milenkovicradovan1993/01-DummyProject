const { test } = require('@playwright/test');
const { FlightSearchPage  } = require('../pages/01-FlightSearchPage');
const { SearchResultsPage } = require('../pages/02-SearchResultsPage');

test('Flight booking search', async ({ page }) => {
  const flightPage = new FlightSearchPage(page);
  const resultsPage = new SearchResultsPage(page);

  await flightPage.goto();
  await flightPage.verifyOneWaySelected(); 
  await flightPage.chooseClass('First');
  await flightPage.selectFrom('BER', 'Berlin Brandenburg Willy Brandt');
  await flightPage.selectTo('IST', 'Istanbul Airport');
  await flightPage.pickDate('December 2025', '29');
  await flightPage.setAdults(4);
  await flightPage.setChildren(1);
  await flightPage.searchFlights();

  await page.waitForTimeout(5000); // optional demo pause
  await resultsPage.verifyLogoVisible();
  await resultsPage.openSearchSummary();
  await resultsPage.verifySearchDetails({
    route: 'BER - IST',
    date: '29-12-2025',
    adults: 4,
    children: 1,
    infants: 0
  });
});