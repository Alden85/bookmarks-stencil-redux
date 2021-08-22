import { newE2EPage } from '@stencil/core/testing';

describe('app-display-bookmarks', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-display-bookmarks></app-display-bookmarks>');

    const element = await page.find('app-display-bookmarks');
    expect(element).toHaveClass('hydrated');
  });
});
