'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _reactNativeCompat = require('react-native-compat');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  main: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 1)'
  },
  icon: {
    width: 20,
    height: 20,
    opacity: 0.5
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5
  },
  headerText: {
    marginLeft: 5,
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.5)'
  },
  menuContainer: (0, _extends3.default)({}, _reactNativeCompat.StyleSheet.absoluteFillObject, {
    right: null,
    paddingHorizontal: 8,
    paddingBottom: 8,
    backgroundColor: 'rgba(247, 247, 247, 1)'
  }),
  previewContainer: {
    flex: 1
  },
  previewWrapper: {
    flex: 1
  },
  closeButton: {
    marginVertical: 5
  },
  preview: (0, _extends3.default)({}, _reactNativeCompat.StyleSheet.absoluteFillObject)
};