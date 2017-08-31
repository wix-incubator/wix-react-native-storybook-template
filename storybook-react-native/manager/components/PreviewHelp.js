'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  main: {
    margin: 15,
    maxWidth: 600,
    lineHeight: 1.4,
    fontFamily: '"Helvetica Neue", Helvetica, "Segoe UI", Arial, freesans, sans-serif'
  },

  code: {
    fontSize: 15,
    fontWeight: 600,
    padding: '2px 5px',
    border: '1px solid #eae9e9',
    borderRadius: 4,
    backgroundColor: '#f3f2f2',
    color: '#3a3a3a'
  },

  codeBlock: {
    backgroundColor: '#f3f2f2',
    padding: '1px 10px',
    margin: '10px 0'
  }
};

var PreviewHelp = function PreviewHelp() {
  return _react2.default.createElement(
    'div',
    { style: styles.main },
    _react2.default.createElement(
      'h1',
      null,
      'Welcome to storybook'
    ),
    _react2.default.createElement(
      'p',
      null,
      'This is a UI component dev environment for your app.'
    ),
    _react2.default.createElement(
      'p',
      null,
      'We\'ve added some basic stories inside the ',
      _react2.default.createElement(
        'span',
        { style: styles.code },
        'storybook/stories'
      ),
      ' ',
      'directory. A story is a single state of one or more UI components. You can have as many stories as you want. Basically a story is like a visual test case.'
    ),
    _react2.default.createElement(
      'p',
      null,
      'To see your Storybook stories on the device, you should start your mobile app for the',
      ' ',
      _react2.default.createElement(
        'span',
        { style: styles.code },
        '<platform>'
      ),
      ' of your choice (typically ios or android). (Note that due to an implementation detail, your stories will only show up in the left-pane after your device has connected to this storybook server.)'
    ),
    _react2.default.createElement(
      'p',
      null,
      'For ',
      _react2.default.createElement(
        'span',
        { style: styles.code },
        'create-react-native-app'
      ),
      ' apps:'
    ),
    _react2.default.createElement(
      'div',
      { style: styles.codeBlock },
      _react2.default.createElement(
        'pre',
        { style: styles.instructionsCode },
        'npm run <platform>'
      )
    ),
    _react2.default.createElement(
      'p',
      null,
      'For ',
      _react2.default.createElement(
        'span',
        { style: styles.code },
        'react-native init'
      ),
      ' apps:'
    ),
    _react2.default.createElement(
      'div',
      { style: styles.codeBlock },
      _react2.default.createElement(
        'pre',
        { style: styles.instructionsCode },
        'react-native run-<platform>'
      )
    )
  );
};

exports.default = PreviewHelp;