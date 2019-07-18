import storybookTab from './storybook-tab';

import {storiesOf as storybookStoriesOf} from '@storybook/react-native';
export {configureStoriesWithDecorators, getStorybook} from './get-storybook';

export function storiesOf(...args) {
  return addDecorators(
    storybookStoriesOf(...args)
  );
}

export function getStorybookTab(resolveFunction, moduleName, options) {
  const ReactNative = require('react-native');
  Object.defineProperty(ReactNative, 'AsyncStorage', {
    get() {
      return require('@react-native-community/async-storage').default;
    },
  });

  return storybookTab(resolveFunction, moduleName, options);
}
