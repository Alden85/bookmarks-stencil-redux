import { Component, State, h } from '@stencil/core';
import { store } from '@stencil/redux';
import { loadData,deleteData } from '../../actions/data';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
})

export class AppHome {
  @State() bookmarks:any;
  @State() filteredBookmarks:any;
  @State() filteredTags:any;
  @State() loading: boolean;
  @State() error: any;
  @State() searchTerm: any;

  loadData: (...args: any) => any;
  deleteData:(...args: any)=>any;

  componentWillLoad() {
    store.mapStateToProps(this, state => {
      const {
        dataReducer: { bookmarks, loading, error },
      } = state;
      return {
        bookmarks,
        loading,
        error,
      };
    });

    store.mapDispatchToProps(this, {
      loadData,
      deleteData,
    });

    this.loadData();
    
  }

  handleFilter(event) {
    this.searchTerm = event.target.value;
  }

  


  render() {
  
  const searchTermToLowerCase = !this.searchTerm ? '':this.searchTerm.toLowerCase()
  const filteredData = this.bookmarks.filter(
    (bookmark)=>bookmark.tags.toString().toLowerCase().includes(searchTermToLowerCase)
  )
  this.filteredTags = filteredData

  const dataToBeRendered = !this.searchTerm ? this.bookmarks : this.filteredTags
  
    return(
      <div class='container'>
        <div class='bookmark-title'>
          Bookmarks
        </div>
        
        <div class='filter-by-tag'>
          <div><h5>Search bookmarks</h5></div>
          <input 
            placeholder='Filter by tag...'
            type="text" 
            value={this.searchTerm}
            onInput={(event) => this.handleFilter(event)}
          />
        </div>
        <div class='bookmark-table'>
        
                <table>
                  <tr>
                    <td><b>Bookmark Name</b></td>
                    <td><b>Bookmark Link</b></td>
                    <td><b>Tags</b></td>
                  </tr>
                  {dataToBeRendered.map(bookmark=>{
                    
                    return(
                      
                      <tr>
                        <td>
                          <a href={bookmark.link} target="_blank">{bookmark.name}
                          </a>
                        </td>
                        <td>
                          <a href={bookmark.link} target="_blank">{bookmark.link}
                          </a>
                        </td>
                        <td>{bookmark.tags.toString()}</td>
                        <td>
                          <form>
                          <button onClick={deleteData(bookmark.id)}>
                            Delete
                          </button>
                          </form>
                        </td>
                      </tr>
                  
                    )
                  }).reverse()}
                </table>
              
        </div>
        <div class='bookmark-add'>
              <app-add-bookmark/>
        </div>
            
      </div>
    )
  }
}
