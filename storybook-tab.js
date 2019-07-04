import React, {PureComponent} from 'react';
import {getStorybook} from './get-storybook';

import './rn-addons';

export default function getStorybookTab(resolveFunction, module, options) {
  const StorybookUI = getStorybook(resolveFunction, module, options);

  class Storybook extends PureComponent {
    static get options() {
      return {
        statusBar: {
          visible: false,
          drawBehind: true,
        },
        topBar: {
          visible: false,
          drawBehind: true,
        }
      };
    }

    render() {
      return (<StorybookUI/>);
    }
  }

  return Storybook;
}

