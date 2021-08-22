import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'app-display-bookmarks',
  styleUrl: 'app-display-bookmarks.css',
  shadow: true,
})



export class AppDisplayBookmarks {

    @Prop() deleteData:(...args: any)=>any;
    @Prop() searchTerm:any;
    @Prop() bookmarks:any;



   handleDelete(id,bms){
    this.deleteData(id,bms)
    
  }

  render() {

    const searchTermToLowerCase = !this.searchTerm ? '':this.searchTerm.toLowerCase()

    let filteredData = this.bookmarks.filter(
      (bookmark)=>bookmark.tags.toString().toLowerCase().includes(searchTermToLowerCase)
  )
    
  let dataToBeRendered = !this.searchTerm ? this.bookmarks : filteredData

    return (
      
        <div>
                <table>
                  <tr>
                    <td><h4>Bookmark Name</h4></td>
                    <td><h4>Bookmark Link</h4></td>
                    <td><h4>Tags</h4></td>
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
        
    );
  }

}
