import { Component, h } from '@stencil/core';
import { store } from '@stencil/redux';
import { configureStore } from '../../store/index';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {
  componentWillLoad() {
    store.setStore(configureStore({}));
  }

  render() {
    return (
      <div>
        <app-home/>
      </div>
    );
  }
}
