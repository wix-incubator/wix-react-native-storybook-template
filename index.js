global.STORYBOOK_REACT_CLASSES = {};
import {configure, getStorybookUI} from '@storybook/react-native';

import storybookTab from './storybook-tab';

import './add-decorators';

export function configureStoriesWithDecorators(resolveFunction, moduleName) {
  configure(resolveFunction, moduleName);
}

export function getStorybook(resolveFunction, moduleName, options = {port: 7007, host: 'localhost'}) {
  configureStoriesWithDecorators(resolveFunction, moduleName);
  return getStorybookUI(options);
}

export function getStorybookTab(resolveFunction, moduleName, options) {
  return storybookTab(resolveFunction, moduleName, options);
}
