import { Component, State, h } from '@stencil/core';
import { store } from '@stencil/redux';
import { loadData,deleteData} from '../../actions/data';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
})

export class AppHome {
  @State() bookmarks:any;
  @State() loading: boolean;
  @State() error: any;
  @State() searchTerm: any;
  @State() deletedId: any;
  @State() bmsFiltered:any;


  loadData: (...args: any) => any;
  deleteData:(...args: any)=>any;
  //postData:(...args: any)=>any;

  componentWillLoad() {
    store.mapStateToProps(this,state => {
      const {
        dataReducer: { bookmarks, loading, error,deletedId,bmsFiltered},
      } = state;
      return {
        bookmarks,
        loading,
        error,
        deletedId,
        bmsFiltered
      };
    });

    store.mapDispatchToProps(this, {
      loadData,
      deleteData,
      //postData
   
    });
    this.loadData();
  }



  handleDelete(id,bms){
    this.deleteData(id,bms)
    
  }

  handleFilter(event) {
    this.searchTerm = event.target.value;
  }

  render() {
  
    const searchTermToLowerCase = !this.searchTerm ? '':this.searchTerm.toLowerCase()

    let filteredData = this.bookmarks.filter(
      (bookmark)=>bookmark.tags.toString().toLowerCase().includes(searchTermToLowerCase)
  )
    
  let dataToBeRendered = !this.searchTerm ? this.bookmarks : filteredData
  
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
                         <button onClick={()=>
                           this.handleDelete(bookmark.id,this.bookmarks)
                         
                        }>
                            Delete
                          </button>
                       
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
