import { newSpecPage } from '@stencil/core/testing';
import { AppDisplayBookmarks } from '../app-display-bookmarks';

describe('app-display-bookmarks', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppDisplayBookmarks],
      html: `<app-display-bookmarks></app-display-bookmarks>`,
    });
    expect(page.root).toEqualHtml(`
      <app-display-bookmarks>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-display-bookmarks>
    `);
  });
});
