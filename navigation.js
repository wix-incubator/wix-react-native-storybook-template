import {getStorybook} from './index';

export function startStorybookWithNavigation(...args) {
  const StorybookUI = getStorybook(...args);

  const {Navigation} = require('react-native-navigation');

  Navigation.registerComponent('storybook', () => StorybookUI);
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'storybook',
      title: 'Storybook'
    },
  });


  require('loki/configure-react-native');
}
