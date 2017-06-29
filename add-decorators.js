import {Usage} from 'storybook-usage';
//import docs from 'react-storybook-addon-docgen';
import {withKnobsOptions} from '@storybook/addon-knobs';
import {addDecorator} from '@storybook/react-native';
import {withSmartKnobs} from 'storybook-addon-smart-knobs';
//The order is IMPORTANT, docs must be first!!!
//addDecorator(docs);
addDecorator(withSmartKnobs);
addDecorator(Usage);
addDecorator(withKnobsOptions({
  debounce: {wait: 200, leading: true},
  timestamps: true,
}));
