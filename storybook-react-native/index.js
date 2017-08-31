'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.linkTo = exports.action = exports.getStorybookUI = exports.getStorybook = exports.configure = exports.addDecorator = exports.setAddon = exports.storiesOf = undefined;

var _utilDeprecate = require('util-deprecate');

var _utilDeprecate2 = _interopRequireDefault(_utilDeprecate);

var _addonActions = require('@storybook/addon-actions');

var _addonLinks = require('@storybook/addon-links');

var _preview = require('./preview');

var _preview2 = _interopRequireDefault(_preview);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var preview = new _preview2.default();

// NOTE export these to keep backwards compatibility
var storiesOf = exports.storiesOf = preview.storiesOf.bind(preview);
var setAddon = exports.setAddon = preview.setAddon.bind(preview);
var addDecorator = exports.addDecorator = preview.addDecorator.bind(preview);
var configure = exports.configure = preview.configure.bind(preview);
var getStorybook = exports.getStorybook = preview.getStorybook.bind(preview);
var getStorybookUI = exports.getStorybookUI = preview.getStorybookUI.bind(preview);

var action = exports.action = (0, _utilDeprecate2.default)(_addonActions.action, '@storybook/react action is deprecated. See: https://github.com/storybooks/storybook/tree/master/addon/actions');

var linkTo = exports.linkTo = (0, _utilDeprecate2.default)(_addonLinks.linkTo, '@storybook/react linkTo is deprecated. See: https://github.com/storybooks/storybook/tree/master/addon/links');