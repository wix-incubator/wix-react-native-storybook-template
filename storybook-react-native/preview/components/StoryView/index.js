'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StoryView = function (_Component) {
  (0, _inherits3.default)(StoryView, _Component);

  function StoryView(props) {
    var _ref;

    (0, _classCallCheck3.default)(this, StoryView);

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var _this = (0, _possibleConstructorReturn3.default)(this, (_ref = StoryView.__proto__ || (0, _getPrototypeOf2.default)(StoryView)).call.apply(_ref, [this, props].concat(args)));

    _this.state = { storyFn: null, selection: {} };

    _this.storyHandler = _this.selectStory.bind(_this);

    _this.props.events.on('story', _this.storyHandler);
    return _this;
  }

  (0, _createClass3.default)(StoryView, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.events.removeListener('story', this.storyHandler);
    }
  }, {
    key: 'selectStory',
    value: function selectStory(storyFn, selection) {
      this.setState({ storyFn: storyFn, selection: selection });
    }
  }, {
    key: 'renderHelp',
    value: function renderHelp() {
      return _react2.default.createElement(
        _reactNative.View,
        { style: _style2.default.help },
        this.props.url ? _react2.default.createElement(
          _reactNative.Text,
          null,
          'Please open the Storybook UI (',
          this.props.url,
          ') with a web browser and select a story for preview.'
        ) : _react2.default.createElement(
          _reactNative.Text,
          null,
          'Please open the Storybook UI with a web browser and select a story for preview.'
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.state.storyFn) {
        return this.renderHelp();
      }
      var _state$selection = this.state.selection,
          kind = _state$selection.kind,
          story = _state$selection.story;

      var context = { kind: kind, story: story };
      return _react2.default.createElement(
        _reactNative.View,
        { key: kind + ':::' + story, style: _style2.default.main },
        this.state.storyFn(context)
      );
    }
  }]);
  return StoryView;
}(_react.Component);

exports.default = StoryView;


StoryView.propTypes = {
  events: _propTypes2.default.shape({
    on: _propTypes2.default.func.isRequired,
    removeListener: _propTypes2.default.func.isRequired
  }).isRequired,
  url: _propTypes2.default.string.isRequired
};