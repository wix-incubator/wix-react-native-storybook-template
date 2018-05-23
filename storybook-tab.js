import React, {PureComponent} from 'react';
import {AsyncStorage, View} from 'react-native';
import {getStorybook} from './index';
const ASYNC_STORAGE_KEY = 'SELECTED_TAB';


export default function getStorybookTab(resolveFunction, module, options = {}) {

  class Storybook extends PureComponent {

    static navigatorStyle = {
      navBarHidden: true,
      statusBarHidden: true,
      statusBarHideWithNavBar: true
    };

    constructor() {
      super();

      this.state = {
        UI: null,
      };

      fetch('http://localhost:7007')
        .then(() => {
          this.setState({
            UI: getStorybook(
              resolveFunction, module, {host: 'localhost', port: '7007', ...options}
            )()
          });
        })
        .catch(async () => {
          //eslint-disable-next-line no-console
          console.log('Storybook server is not running');

          const currentStory = await AsyncStorage.getItem('currentStory');

          const {EventEmitter} = require('events');
          const channel = new EventEmitter();
          channel.on('setCurrentStory', (story) => {
            AsyncStorage.setItem('currentStory', JSON.stringify(story));
          });

          const addons = require('@storybook/addons').default;
          addons.setChannel(channel);

          this.setState({
            UI: getStorybook(resolveFunction, module, {onDeviceUI: true, ...options})(),
          });

          if (currentStory !== 'null') {
            channel.emit('setCurrentStory', JSON.parse(currentStory));
          }
        });
    }

    onNavigatorEvent(e) {
      if (e.id === 'bottomTabSelected') {
        AsyncStorage.setItem(ASYNC_STORAGE_KEY, e.selectedTabIndex.toString());
      }
    }

    render() {
      return (
        <View style={{flex: 1}}>
          <View style={{height: 20, width: '100%', backgroundColor: 'black'}}/>
          {this.state.UI}
        </View>
      );
    }
  }

  return Storybook;
}
