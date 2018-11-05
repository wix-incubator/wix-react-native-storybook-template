import {configure, getStorybookUI} from '@storybook/react-native';

import storybookTab from './storybook-tab';
import addDecorators from './add-decorators';

export function configureStoriesWithDecorators(resolveFunction, moduleName) {
  addDecorators();
  configure(resolveFunction, moduleName);
}

export function getStorybook(resolveFunction, moduleName, options) {
  configureStoriesWithDecorators(resolveFunction, moduleName);
  return getStorybookUI(options);
}

export function getStorybookTab(resolveFunction, moduleName, options) {
  return storybookTab(resolveFunction, moduleName, options);
}
