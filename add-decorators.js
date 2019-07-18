import {Usage} from 'storybook-usage';
import {withKnobs} from '@storybook/addon-knobs';

export default (storiesOf) => {
  return storiesOf
    .addDecorator(Usage)
    .addDecorator(withKnobs({
      debounce: {wait: 200, leading: true},
      timestamps: true,
    }));
}
