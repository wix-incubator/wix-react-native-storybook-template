import {storiesOf as storybookStoriesOf} from '@storybook/react-native';

import storybookTab from './storybook-tab';
import addDecorators from './add-decorators';

export {configureStoriesWithDecorators, getStorybook} from './get-storybook';

export {linkTo} from './addon-link';

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
