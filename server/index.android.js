import {AppRegistry} from 'react-native';
import {configureStoriesWithDecorators} from '../index';
import CodeScreen from '../code-screen';

const StorybookUI = configureStoriesWithDecorators(() => {
  require('../../stories/index');
}, module);


AppRegistry.registerComponent('#YOUR_APP_NAME#', () => CodeScreen);
