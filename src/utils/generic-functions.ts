import { Page, Locator } from "@playwright/test";

export class GenericFunctions {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * This method is responsible for getting the page title
     * 
     * @returns returns the page title.
     */
    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

    /**
     * This method is responsible for getting the page URL
     * 
     * @returns returns the page URL.
     */
    async getPageURL(): Promise<string> {
        return this.page.url();
    }
}