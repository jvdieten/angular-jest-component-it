import { remote, Browser } from 'webdriverio';
import { config } from '../wdio.conf';

let browser: Browser<'async'>;


describe('Article journey', () => {

  beforeAll(async () => {
    browser = await remote(config);
  });

  afterAll(async () => {
    await browser.deleteSession();
  });

  test('Create a new article', async () => {
      await browser.url('http://localhost:4200/articles');
      const createArticleButton = await browser.$('button');
      await createArticleButton.click();

      const titleInputField = await browser.$('#title');
      const subjectInput = await browser.$('#subjectMatter');
      const nextBtn = await browser.$('#next');
      await titleInputField.setValue('title');
      await subjectInput.setValue('subject');
      await nextBtn.click();

      const nameInputEl = await browser.$('#authorName');
      const birthDayInputEl = await browser.$('#birthday');
      const bioInputEl = await browser.$('#bio');
      const submitBtn = await browser.$('input[type="submit"]');

      await nameInputEl.setValue('name');
      await birthDayInputEl.setValue('2000-02-09');
      await bioInputEl.setValue('bio');
      await submitBtn.click();
      const articles = await browser.$('#articles');
      await articles.waitForExist({ timeout: 5000 });
      expect(await articles.isDisplayed()).toBe(true);
  });
});
