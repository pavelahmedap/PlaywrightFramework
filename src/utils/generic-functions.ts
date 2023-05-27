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

    /**
     * This method is responsible for getting the number of elements in the list
     * NOTE: This method should be use ONLY for the static list
     * 
     * @param locator element
     * @returns number of elemnts in the list
     */
    async getElementsSize(locator: Locator): Promise<number> {
        return await locator.count();
    }

    /**
     * This method is responsible for getting the number of elements; in dynamic list
     * NOTE: This method should be use ONLY for the dynamic list
     * 
     * @param locator element
     * @returns number of elemnts in the list
     */
    async getElementsSizeDynamically(locator: Locator): Promise<number> {
        // Waiting for the last element to be present in the DOM
        await locator.last().waitFor({
            state: 'visible'
        })
        return await locator.count();
    }

    /**
     * This method is responsible for selecting the value from static list
     * 
     * @param locator element
     * @param value value to select
     */
    async selectStaticValueFromDropDown(locator: Locator, value: string): Promise<void> {
        let size = await this.getElementsSize(locator);

        if (size > 0) {
            for (let i = 0; i < size; i++) {
                let text = (await locator.nth(i).innerText()).trim();
                if (text === value) {
                    await locator.nth(i).click();
                    break;
                }
            }
        }
        else {
            console.log(`Drop-Down value does not exist or list size is 0`);
        }
    }

    /**
     * This method is responsible for selecting the value from dynamic list
     * 
     * @param locator element
     * @param value value to select
     */
    async selectDynamicValueFromDropDown(locator: Locator, value: string): Promise<void> {
        let size = await this.getElementsSizeDynamically(locator);

        if (size > 0) {
            for (let i = 0; i < size; i++) {
                let text = (await locator.nth(i).innerText()).trim();
                if (text === value) {
                    await locator.nth(i).click();
                    break;
                }
            }
        }
        else {
            console.log(`Drop-Down value does not exist or list size is 0`);
        }
    }

    /**
     * This method is responsible for getting the static elements list text value
     * 
     * @param locator element
     * @returns elements list text value
     */
    async getStaticElementsText(locator: Locator): Promise<string[]> {
        let elementsText: string[] = [];

        let size = await this.getElementsSize(locator);

        for (let i = 0; i < size; i++) {
            let text = (await locator.nth(i).innerText()).trim();
            elementsText.push(text);
        }

        return elementsText;
    }

    /**
     * This method is responsible for getting the dynamic elements list text value
     * 
     * @param locator element
     * @returns elements list text value
     */
    async getDynamicElementsText(locator: Locator): Promise<string[]> {
        let elementsText: string[] = [];

        let size = await this.getElementsSizeDynamically(locator);

        for (let i = 0; i < size; i++) {
            let text = (await locator.nth(i).innerText()).trim();
            elementsText.push(text);
        }

        return elementsText;
    }

    /**
     * This method is responsible for getting the attribute value
     * 
     * @param locator element
     * @param attributeName 
     * @returns attribute value if it's exist, null
     */
    async getAttributeValue(locator: Locator, attributeName: string): Promise<string | null> {
        return await locator.getAttribute(attributeName);
    }

    /**
     * This method is responsible for getting the element innterText
     * 
     * @param locator element
     * @returns element innterText
     */
    async getInnterText(locator: Locator): Promise<string> {
        return await locator.innerText();
    }

    /**
     * This method is responsible for pressing the "Enter" key on the keyboard
     */
    async pressEnter() {
        await this.page.keyboard.press('Enter');
    }
}