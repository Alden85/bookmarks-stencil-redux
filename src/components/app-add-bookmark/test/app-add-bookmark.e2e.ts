import { newE2EPage } from '@stencil/core/testing';

describe('app-add-bookmark', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-add-bookmark></app-add-bookmark>');

    const element = await page.find('app-add-bookmark');
    expect(element).toHaveClass('hydrated');
  });
});
