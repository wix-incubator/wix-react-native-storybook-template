import * as React from 'react';
import {View} from 'react-native';
import {Usage} from 'storybook-usage';
import {withKnobs} from '@storybook/addon-knobs';

export default (storiesOf) => {
  return storiesOf
    .addDecorator((storyFn, context) => (
      <View testID={context.id}>{storyFn()}</View>
    ))
    .addDecorator(Usage)
    .addDecorator(withKnobs({
      debounce: {wait: 200, leading: true},
      timestamps: true,
    }));
}
