import { ComponentHarness } from '@angular/cdk/testing';

export class AuthorFormHarness extends ComponentHarness {
  static hostSelector = 'app-author-form';
  protected getNameInputElement = this.locatorFor('#authorName', 'app-author-form');

  async setName(authorName: string): Promise<void> {
    const name = await this.getNameInputElement();
    return name.sendKeys(authorName);
  }

}
