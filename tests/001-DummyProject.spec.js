const { test, expect } = require('@playwright/test');

test('Flight', async ({ page }) => {
  await page.goto('https://phptravels.net/flights');
  await expect(page).toHaveURL('https://phptravels.net/flights');

  // Ensure that One Way is selected
   const flightTypeSelect = page.locator('select.flight_way');
   await expect(flightTypeSelect).toHaveValue('oneway');
   // Choose First class
  
   await page.locator('#flight_type').selectOption('First')

  // Click the "Flying From" input to open the dropdown
  await page.locator('div.form-floating.flight_search input[name="from"]').click();

  // Wait for dropdown to become visible
  await page.waitForSelector('.results-container-from', { timeout: 5000 });


  // Select Berlin
  const berlinOption = page.locator('div[data-code="BER"][data-airport="Berlin Brandenburg Willy Brandt"]');
  await berlinOption.click();

  // Select Istanbul

  const toInput = page.locator('div.form-floating.flight_search input[name="to"]');
     await toInput.click();
     await toInput.fill('IST');

  await page.waitForSelector('.results-container-to', { timeout: 5000 });

  const istanbulOption = page.locator('div[data-code="IST"][data-airport="Istanbul Airport"]');
  await istanbulOption.click();

  // date picker
   const switcher = "December 2025"

   await page.click('input[name="depart"]');  // opens Calendar
 

    // Search for December 22 2025
   while (true) 
{
      const currentswitcher = await page.locator('//*[@id="fadein"]/div[5]/div[1]/table/thead/tr[1]/th[2]').textContent()
       if(currentswitcher == switcher)
        {
          break;
        }
     await page.locator('xpath=/html/body/div[5]/div[1]/table/thead/tr[1]/th[3]').click();
      }

    await page.click('xpath=/html/body/div[5]/div[1]/table/tbody/tr[5]/td[2]')

    const numberofPerson = page.locator('div.dropdown.dropdown-contain');
    await numberofPerson.click();
   const adult = 4;

    while (true) {
      const numberofAdultText = await page
          .locator('xpath=/html/body/main/section/section/div/div/div/form/div[2]/div[4]/div/div/div/div/div[1]/div/div/input')
          .inputValue(); // Use inputValue() instead of textContent for input elements

        const numberofAdult = parseInt(numberofAdultText.trim(), 10);

        if (numberofAdult >= adult) {
         break;
         }

        await page.locator('.dropdown-item.adult_qty .qtyInc').click();
    }
    
    await page.click('xpath=/html/body/main/section/section/div/div/div/form/div[2]/div[5]/button')

    await page.waitForTimeout(5000); // demo pause */
    
    const logoElement = page.locator('.logo.p-1.rounded');
     await expect(logoElement).toBeVisible(); 

     //test 
     
    // Assert BER text exists (using :text or checking inner HTML)
     //const berElement = page.locator('span.title__fetched-time strong.text-uppercase.mx-3');
     //await expect(berElement).toHaveText(/ber/i);

     // Confirm IST
     // const istElement = page.locator('span.title__fetched-time small >> text=ist');
     // await expect(istElement).toBeVisible();

      // Confirm date
      //const dateElement = page.locator('span.title__fetched-time >> small', { hasText: '29-12-2025' });
       //await expect(dateElement).toHaveText('29-12-2025');
       // Found bettwer way to confirm assertions
     const searchDropdown = page.locator('a.searches.nav-link.dropdown-toggle');
       await expect(searchDropdown).toBeVisible();
        await searchDropdown.click();
 
      // Wait and locate the content inside the opened dropdown
     const searchSummary = page.locator('.dropdown-menu.show'); // Or use a more specific class if needed
         await expect(searchSummary).toBeVisible();
      await page.waitForTimeout(2000); 

      // Assert destination, date, and passengers
        await expect(searchSummary).toContainText('BER - IST');
        await expect(searchSummary).toContainText('29-12-2025');
        await expect(searchSummary).toContainText('4 Adults');
        await expect(searchSummary).toContainText('0 Child');
        await expect(searchSummary).toContainText('0 Infants');


});