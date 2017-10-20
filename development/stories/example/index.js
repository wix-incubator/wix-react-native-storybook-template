import React from 'react';
import {View, Text} from 'react-native';

export default function example(storiesOf, module) {
  storiesOf('Example', module)
    .add('Default', () => {
      return (<View><Text>Hello</Text></View>);
    });
}
