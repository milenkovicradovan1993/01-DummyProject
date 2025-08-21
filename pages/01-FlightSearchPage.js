const { expect } = require('@playwright/test');

class FlightSearchPage  {
    constructor(page) {
        this.page = page;
        this.flightTypeSelect = page.locator('select.flight_way');
        this.flightType = page.locator('#flight_type');
        this.fromInput = page.locator('div.form-floating.flight_search input[name="from"]');
        this.toInput = page.locator('div.form-floating.flight_search input[name="to"]');
        this.departInput = page.locator('input[name="depart"]');
        this.passengerDropdown = page.locator('div.dropdown.dropdown-contain');
        this.adultQtyIncrease = page.locator('.dropdown-item.adult_qty .qtyInc');
        this.adultQtyInput = page.locator('.dropdown-item.adult_qty input');
        this.childQtyIncrease = page.locator('.dropdown-item.child_qty .qtyInc');
        this.childQtyInput = page.locator('.dropdown-item.child_qty input');
        this.searchButton = page.locator('button#flights-search');
       }
        async goto() {
           await this.page.goto('https://phptravels.net/flights');
       }
        async verifyOneWaySelected() {
          await expect(this.flightTypeSelect).toHaveValue('oneway');
        }
        async chooseClass(flighttype) {
            await this.flightType.selectOption(flighttype);
       }
        async selectFrom(cityCode, airportName) {
          await this.fromInput.click();
          await this.page.waitForSelector('.results-container-from', { timeout: 5000 });
          await this.page
            .locator(`div[data-code="${cityCode}"][data-airport="${airportName}"]`)
            .click();
         }
        async selectTo(cityCode, airportName) {
         await this.toInput.click();
         await this.toInput.fill(cityCode);
         await this.page.waitForSelector('.results-container-to', { timeout: 5000 });
         await this.page
            .locator(`div[data-code="${cityCode}"][data-airport="${airportName}"]`)
            .click();
         }
        async pickDate(monthYear, day) {
         await this.departInput.click();
         
          while (true) {
              const currentMonthYear = (await this.page
                    .locator('#fadein .datepicker-days th.switch')
                     .first()
                    .textContent()).trim();

              if (currentMonthYear === monthYear) break;

                    await this.page.locator('#fadein .datepicker-days th.next').first().click();
            }
             await this.page
                  .locator(`#fadein .datepicker-days td.day:text-is("${day}")`)
                    .first().click();
            }
        async setAdults(adultCount) {
         await this.passengerDropdown.click();
         while (true) {
        const currentAdults = parseInt(await this.adultQtyInput.inputValue(), 10);
          if (currentAdults >= adultCount) break;
         await this.adultQtyIncrease.click();
          }
        }
         async setChildren(childCount) {
              while (true) {
                const currentChildren = parseInt(await this.childQtyInput.inputValue(), 10);
                if (currentChildren >= childCount) break;
                await this.childQtyIncrease.click();
            }
         }
        async searchFlights() {
           await this.searchButton.click();

              }
        }

    module.exports = { FlightSearchPage };
