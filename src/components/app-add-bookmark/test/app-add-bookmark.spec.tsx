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
           <div>
          <div>
            <h2>
              Add New Bookmark
           </h2>
          </div>
          <form>
            <div>
              <input placeholder="name" type="text" value="">
           </div>
            <div>
              <input placeholder="https://www.example.com" type="text" value="">
            </div>
            <div>
              <input placeholder="tags" type="text" value="">
            </div>
            <div>
               <input class="submit" type="submit" value="Add">
          </div>
         </form>
       </div>
        </mock:shadow-root>
      </app-add-bookmark>
    `);
  });
});
