import React, {PureComponent} from 'react';
import {AsyncStorage, View} from 'react-native';
import {getStorybook} from './get-storybook';

import './rn-addons';

const ASYNC_STORAGE_KEY = 'SELECTED_TAB';

export default function getStorybookTab(resolveFunction, module, options) {
  const StorybookUI = getStorybook(resolveFunction, module, options);

  class Storybook extends PureComponent {
    static get options() {
      return {
        statusBar: {
          visible: false,
          drawBehind: true,
        },
        topBar: {
          visible: false,
          drawBehind: true,
        }
      };
    }

    onNavigatorEvent(e) {
      if (e.id === 'bottomTabSelected' && e.selectedTabIndex !== undefined && e.selectedTabIndex !== null) {
        AsyncStorage.setItem(ASYNC_STORAGE_KEY, e.selectedTabIndex.toString());
      }
    }

    render() {
      return (<StorybookUI/>);
    }
  }

  return Storybook;
}

