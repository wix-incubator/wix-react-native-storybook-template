'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _manager = require('./manager');

Object.defineProperty(exports, 'register', {
  enumerable: true,
  get: function get() {
    return _manager.register;
  }
});
var ADDON_ID = exports.ADDON_ID = 'storybook/rn-pair';
var PANEL_ID = exports.PANEL_ID = ADDON_ID + '/panel';