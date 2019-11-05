describe('Routing', () => {
    const baseUrl = 'http://localhost:3000';

    beforeEach(async () => {
        await page.goto(baseUrl);
    });

    it('should be possible to visit the about page', async () => {
        // arrange
        await page.click('a[href="/about"]');
        // assert
        await expect(page).toMatch('About page');
    }, 3000);

    it('should be possible to go back to home after the about page', async () => {
        // arrange
        await page.click('a[href="/about"]');
        await page.click('a[href="/"]');

        // assert
        await expect(page).toMatch('Home page');
    }, 3000);
});