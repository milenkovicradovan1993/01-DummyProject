const { expect } = require('@playwright/test');  

class SearchResultsPage {
  constructor(page) {
    this.page = page;
    this.logo = page.locator('.logo.p-1.rounded');
    this.searchDropdown = page.locator('a.searches.nav-link.dropdown-toggle');
    this.searchSummary = page.locator('.dropdown-menu.show');
  }

  async verifyLogoVisible() {
    await expect(this.logo).toBeVisible();
  }

  async openSearchSummary() {
    await expect(this.searchDropdown).toBeVisible();
    await this.searchDropdown.click();
    await expect(this.searchSummary).toBeVisible();
  }

  async verifySearchDetails({ route, date, adults, children, infants }) {
    await expect(this.searchSummary).toContainText(route);
    await expect(this.searchSummary).toContainText(date);
    await expect(this.searchSummary).toContainText(`${adults} Adults`);
    await expect(this.searchSummary).toContainText(`${children} Child`);
    await expect(this.searchSummary).toContainText(`${infants} Infants`);
  }
}

module.exports = { SearchResultsPage };