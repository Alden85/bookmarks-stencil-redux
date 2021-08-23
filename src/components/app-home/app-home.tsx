import { Component, State, h } from '@stencil/core';
import { store } from '@stencil/redux';
import { loadData,deleteData,postData} from '../../actions/data';
import { v4 as uuidv4 } from 'uuid';

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

  //State to manage POST Form data
  @State() name:string='';
  @State() link:string = '';
  @State() tags:string = '';


  //Action Generator Functions
  loadData: (...args: any) => any;
  deleteData:(...args: any)=>any;
  postData: (...args:any)=>any;

  componentWillLoad() {
    store.mapStateToProps(this,state => {
      const {
        dataReducer: { bookmarks, loading, error,deletedId}
      } = state;
      return {
        bookmarks,
        loading,
        error,
        deletedId,
     
      };
    });

    store.mapDispatchToProps(this, {
      loadData,
      deleteData,
      postData
   
    });
    this.loadData();
  }

  handleFilter(event) {
    this.searchTerm = event.target.value;
  }

  handlePost(bookmark,bookmarksList){
    this.postData(bookmark,bookmarksList)
    this.name='',
    this.link = '',
    this.tags = ''
  }

  handleName(event) {
    this.name = event.target.value;
  }

  handleLink(event) {
    this.link = event.target.value;
  }

  handleTags(event) {
    this.tags = event.target.value;
  }

  render() {

    let bookmark={
    id:uuidv4(),
    name:this.name,
    link:this.link,
    tags:this.tags.split(',')
    }
  
    return(
      <div class='container'>
        <div class='bookmark-title'>
          Bookmarks
        </div>
        
        <div class='filter-by-tag'>
          <div class='search'>
            <h5>Search bookmarks</h5>
          </div>
          <input 
            class='inputField'
            placeholder='Filter by tag...'
            type="text" 
            value={this.searchTerm}
            onInput={(event) => this.handleFilter(event)}
          />
        </div>
        <div class='bookmark-list'>
          <app-display-bookmarks
            deleteData={this.deleteData}
            searchTerm={this.searchTerm}
            bookmarks={this.bookmarks}
          />
        </div>
        <div class='bookmark-add'>
          <div><h2>Add Bookmark</h2></div>
           <div>
            <input 
             class='inputField'
            placeholder='name' 
            type="text" 
            value={this.name}
            onInput={(event) => this.handleName(event)}
            
          />
          </div>
          <div>
          <input 
          class='inputField'
            placeholder='https://www.example.com' 
            type="text" 
            value={this.link}
            onInput={(event) => this.handleLink(event)}
          />
          </div>
          <div>
          <input 
            class='inputField'
            placeholder='tags' 
            type="text" 
            value={this.tags}
            onInput={(event) => this.handleTags(event)}
          />
        
          </div>
         
          <div>
              <button class='submit' onClick={()=>this.handlePost(bookmark,this.bookmarks)}>Add</button>
          
            </div>
        </div>
            
      </div>
    )
  }
}
