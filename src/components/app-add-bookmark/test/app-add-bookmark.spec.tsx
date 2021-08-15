import { newSpecPage } from '@stencil/core/testing';
import { AppAddBookmark } from '../app-add-bookmark';

describe('app-add-bookmark', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppAddBookmark],
      html: `<app-add-bookmark></app-add-bookmark>`,
    });
    expect(page.root).toEqualHtml(`
      <app-add-bookmark>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-add-bookmark>
    `);
  });
});
