import React from 'react';
import Switch from './src/Stack';
import {Provider} from 'react-redux';
import store from './src/redux/store';
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Switch />
      </Provider>
    );
  }
}
