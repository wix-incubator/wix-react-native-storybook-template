import {startStorybookWithNavigation} from 'wix-react-native-storybook-server/navigation';
startStorybookWithNavigation(() => {
  require('../stories/index');
}, module);


//import {getStorybook} from 'wix-react-native-storybook-server';
//const StorybookUI = getStorybook(() => {
//  require('../stories/index');
//}, module);
//AppRegistry.registerComponent('#YOUR_APP_NAME#', () => StorybookUI);
