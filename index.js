import {configure, getStorybookUI} from '@storybook/react-native';

import storybookTab from './storybook-tab';
import addDecorators from './add-decorators';

export function configureStoriesWithDecorators(resolveFunction, moduleName, docgen) {
  addDecorators(docgen);
  configure(resolveFunction, moduleName);
}

export function getStorybook(resolveFunction, moduleName, options, docgen) {
  configureStoriesWithDecorators(resolveFunction, moduleName, docgen);
  return getStorybookUI(options);
}

export function getStorybookTab(resolveFunction, moduleName, options, docgen) {
  return storybookTab(resolveFunction, moduleName, options, docgen);
}
