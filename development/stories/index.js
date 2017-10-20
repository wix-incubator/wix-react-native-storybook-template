import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {View, Text} from 'react-native';

function example(storiesOf, module) {
  storiesOf('Example', module)
    .add('Default', () => {
      return (<View><Text>Hello</Text></View>);
    });
}


const stories = [
  example,
  //...otherStories
];

stories.forEach((fn) => fn.default(storiesOf, module));
