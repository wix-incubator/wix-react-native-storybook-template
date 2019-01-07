import {configure, getStorybookUI} from '@storybook/react-native';
import addDecorators from './add-decorators';

export function configureStoriesWithDecorators(resolveFunction, moduleName) {
  addDecorators();
  configure(resolveFunction, moduleName);
}

export function getStorybook(resolveFunction, moduleName, options) {
  configureStoriesWithDecorators(resolveFunction, moduleName);
  return getStorybookUI(options);
}
