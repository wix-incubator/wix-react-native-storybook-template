'use strict';

var _utilDeprecate = require('util-deprecate');

var _utilDeprecate2 = _interopRequireDefault(_utilDeprecate);

require('@storybook/addon-actions/register');

require('@storybook/addon-links/register');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _utilDeprecate2.default)(function () {}, '@storybook/react-native/addons is deprecated. See https://storybook.js.org/addons/using-addons/')();