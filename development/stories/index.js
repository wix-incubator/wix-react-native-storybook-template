import {storiesOf} from '@storybook/react-native';

const stories = [
  require('./example'),
  //...otherStories
];

stories.forEach((fn) => fn.default(storiesOf, module));
