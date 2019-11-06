import {configure, getStorybookUI} from '@storybook/react-native';

export function configureStoriesWithDecorators(resolveFunction, moduleName) {
  configure(resolveFunction, moduleName);
}

export function getStorybook(resolveFunction, moduleName, options) {
  configureStoriesWithDecorators(resolveFunction, moduleName);
  return getStorybookUI({...options, asyncStorage: require('@react-native-community/async-storage').default});
}
