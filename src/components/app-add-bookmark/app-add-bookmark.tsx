import { Component,State, h } from '@stencil/core';
import { postData } from '../../actions/data';
import { v4 as uuidv4 } from 'uuid';

@Component({
  tag: 'app-add-bookmark',
  styleUrl: 'app-add-bookmark.css',
  shadow: true,
})
export class AppAddBookmark {

  @State() name:string='';
  @State() link:string = '';
  @State() tags:string = '';

  postData: (...args:any)=>any;

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

    return (
      <div>
        <div>
          <h2>Add New Bookmark</h2>
        </div>
      <form onSubmit={postData(bookmark)}>
          <div>
            <input 
            placeholder='name' 
            type="text" 
            value={this.name}
            onInput={(event) => this.handleName(event)}
            
          />
          </div>
          <div>
          <input 
            placeholder='https://www.example.com' 
            type="text" 
            value={this.link}
            onInput={(event) => this.handleLink(event)}
          />
          </div>
          <div>
          <input 
            placeholder='tags' 
            type="text" 
            value={this.tags}
            onInput={(event) => this.handleTags(event)}
          />
          </div>
          <div> 
            <input class='submit' type="submit" value='Add'/>
          </div>
        </form>
        </div>
    );
  }

  
}


