import {Usage} from 'storybook-usage';
import {withKnobsOptions} from '@storybook/addon-knobs';
import {addDecorator} from '@storybook/react-native';

export default () => {
  addDecorator(Usage);
  addDecorator(withKnobsOptions({
    debounce: {wait: 200, leading: true},
    timestamps: true,
  }));
}
