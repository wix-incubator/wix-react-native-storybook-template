import {Usage} from 'storybook-usage';
import {withKnobsOptions} from '@storybook/addon-knobs';
import {addDecorator} from '@storybook/react-native';
import {withSmartKnobs} from './smart-knobs';

//The order is IMPORTANT, docs must be first!!!
export default (docgen) => {
  addDecorator(Usage);
  addDecorator(withSmartKnobs(docgen));
  addDecorator(withKnobsOptions({
    debounce: {wait: 200, leading: true},
    timestamps: true,
  }));
}
