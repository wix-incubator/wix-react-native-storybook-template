import {configure, getStorybookUI} from '@storybook/react-native';
import {configureStoriesWithDecorators} from './index';
import addDecorators from './add-decorators';

export function configureStoriesWithDecorators(resolveFunction, moduleName) {
  addDecorators();
  configure(resolveFunction, moduleName);
}

export function getStorybook(resolveFunction, moduleName, options) {
  configureStoriesWithDecorators(resolveFunction, moduleName);
  return getStorybookUI(options);
}
