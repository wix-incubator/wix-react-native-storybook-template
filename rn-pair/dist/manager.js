'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = register;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _addons = require('@storybook/addons');

var _addons2 = _interopRequireDefault(_addons);

var _QRCodePanel = require('./containers/QRCodePanel');

var _QRCodePanel2 = _interopRequireDefault(_QRCodePanel);

var _ = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function register() {
  _addons2.default.register(_.ADDON_ID, function () {
    var channel = _addons2.default.getChannel();
    _addons2.default.addPanel(_.PANEL_ID, {
      title: 'RN Pair',
      render: function render() {
        return _react2.default.createElement(_QRCodePanel2.default, { channel: channel });
      }
    });
  });
}