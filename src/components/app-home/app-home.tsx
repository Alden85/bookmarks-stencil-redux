import { Component, State, h } from '@stencil/core';
import { store } from '@stencil/redux';
import { loadData,deleteData } from '../../actions/data';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
})

export class AppHome {
  @State() bookmarks:any;
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
    return(
      <div class='container'>
        <div class='bookmark-title'>
          <h1>Bookmarks</h1>
        </div>
        <div>
          <input 
            placeholder='Filter by tag...'
            type="text" 
            value={this.searchTerm}
            onInput={(event) => this.handleFilter(event)}
          />
          {console.log(this.searchTerm)}
        </div>
        <div class='bookmark-table'>
        
                <table>
                  <tr>
                    <td>Bookmark Name</td>
                    <td>Bookmark Link</td>
                    <td>Bookmark Tags</td>
                  </tr>
                  {this.bookmarks.map(bookmark=>{
                    
                    return(
                      
                      <tr>
                        <td>{bookmark.name}</td>
                        <td>{bookmark.link}</td>
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
                  })}
                </table>
              
        </div>
        <div class='bookmark-add'>
              <app-add-bookmark/>
        </div>
            
      </div>
    )
  }
}
