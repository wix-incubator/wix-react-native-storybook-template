import {Usage} from 'storybook-usage';
import {withKnobs} from '@storybook/addon-knobs';
import {addDecorator} from '@storybook/react-native';

export default () => {
  addDecorator(Usage);
  addDecorator(withKnobs({
    debounce: {wait: 200, leading: true},
    timestamps: true,
  }));
}
