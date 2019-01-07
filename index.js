import storybookTab from './storybook-tab';

export {configureStoriesWithDecorators, getStorybook} from './get-storybook';

export function getStorybookTab(resolveFunction, moduleName, options) {
  return storybookTab(resolveFunction, moduleName, options);
}
