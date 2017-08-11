import {getStorybook} from 'wix-react-native-storybook-server';

const StorybookUI = getStorybook(() => {
  require('../stories/index');
}, module);

AppRegistry.registerComponent('#YOUR_APP_NAME#', () => StorybookUI);
