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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactNative = require('react-native');

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var _StoryListView = require('../StoryListView');

var _StoryListView2 = _interopRequireDefault(_StoryListView);

var _StoryView = require('../StoryView');

var _StoryView2 = _interopRequireDefault(_StoryView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var openMenuImage = require('./menu_open.png');
var closeMenuImage = require('./menu_close.png');

var OnDeviceUI = function (_Component) {
  (0, _inherits3.default)(OnDeviceUI, _Component);

  function OnDeviceUI() {
    var _ref;

    (0, _classCallCheck3.default)(this, OnDeviceUI);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = (0, _possibleConstructorReturn3.default)(this, (_ref = OnDeviceUI.__proto__ || (0, _getPrototypeOf2.default)(OnDeviceUI)).call.apply(_ref, [this].concat(args)));

    _this.state = {
      menuAnimation: new _reactNative.Animated.Value(0),
      isMenuOpen: false,
      selectedKind: null,
      selectedStory: null,
      menuWidth: 0
    };

    _this.storyChangedHandler = _this.handleStoryChanged.bind(_this);
    _this.menuToggledHandler = _this.handleToggleMenu.bind(_this);
    _this.menuLayoutHandler = _this.handleMenuLayout.bind(_this);

    _this.props.events.on('story', _this.storyChangedHandler);
    return _this;
  }

  (0, _createClass3.default)(OnDeviceUI, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.events.removeListener('story', this.storyChangedHandler);
    }
  }, {
    key: 'handleStoryChanged',
    value: function handleStoryChanged(storyFn, selection) {
      var kind = selection.kind,
          story = selection.story;

      this.setState({
        selectedKind: kind,
        selectedStory: story
      });
    }
  }, {
    key: 'handleToggleMenu',
    value: function handleToggleMenu() {
      var isMenuOpen = !this.state.isMenuOpen;

      _reactNative.Animated.timing(this.state.menuAnimation, {
        toValue: isMenuOpen ? 1 : 0,
        duration: 150,
        easing: _reactNative.Easing.linear
      }).start();

      this.setState({
        isMenuOpen: isMenuOpen
      });
    }
  }, {
    key: 'handleMenuLayout',
    value: function handleMenuLayout(e) {
      this.setState({
        menuWidth: e.nativeEvent.layout.width
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          stories = _props.stories,
          events = _props.events,
          url = _props.url;
      var _state = this.state,
          menuAnimation = _state.menuAnimation,
          selectedKind = _state.selectedKind,
          selectedStory = _state.selectedStory,
          menuWidth = _state.menuWidth;


      var menuStyles = [_style2.default.menuContainer, {
        transform: [{
          translateX: menuAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [menuWidth * -1, 0]
          })
        }]
      }];

      var menuSpacerStyles = [{
        width: menuAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, menuWidth]
        })
      }];

      var headerStyles = [_style2.default.headerContainer, {
        opacity: menuAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0]
        })
      }];

      /*
        Checks if import is a base64 encoded string uri.
        If using haul as bundler, some projects are set up to include small files as base64 strings.
       */
      var openIcon = openMenuImage;
      if (typeof openIcon === 'string') {
        openIcon = { uri: openMenuImage };
      }
      var closeIcon = closeMenuImage;
      if (typeof closeIcon === 'string') {
        closeIcon = { uri: closeMenuImage };
      }

      return _react2.default.createElement(
        _reactNative.View,
        { style: _style2.default.main },
        _react2.default.createElement(_reactNative.StatusBar, { hidden: true }),
        _react2.default.createElement(_reactNative.Animated.View, { style: menuSpacerStyles }),
        _react2.default.createElement(
          _reactNative.View,
          { style: _style2.default.previewContainer },
          _react2.default.createElement(
            _reactNative.Animated.View,
            { style: headerStyles },
            _react2.default.createElement(
              _reactNative.TouchableWithoutFeedback,
              { onPress: this.menuToggledHandler },
              _react2.default.createElement(
                _reactNative.View,
                null,
                _react2.default.createElement(_reactNative.Image, { source: openIcon, style: _style2.default.icon })
              )
            ),
            _react2.default.createElement(
              _reactNative.Text,
              { style: _style2.default.headerText, numberOfLines: 1 },
              selectedKind,
              ' / ',
              selectedStory
            )
          ),
          _react2.default.createElement(
            _reactNative.View,
            { style: _style2.default.previewWrapper },
            _react2.default.createElement(
              _reactNative.View,
              { style: _style2.default.preview },
              _react2.default.createElement(_StoryView2.default, { url: url, events: events })
            )
          )
        ),
        _react2.default.createElement(
          _reactNative.Animated.View,
          { style: menuStyles, onLayout: this.menuLayoutHandler },
          _react2.default.createElement(
            _reactNative.TouchableWithoutFeedback,
            { onPress: this.menuToggledHandler },
            _react2.default.createElement(
              _reactNative.View,
              { style: _style2.default.closeButton },
              _react2.default.createElement(_reactNative.Image, { source: closeIcon, style: _style2.default.icon })
            )
          ),
          _react2.default.createElement(_StoryListView2.default, {
            stories: stories,
            events: events,
            selectedKind: selectedKind,
            selectedStory: selectedStory
          })
        )
      );
    }
  }]);
  return OnDeviceUI;
}(_react.Component);

exports.default = OnDeviceUI;


OnDeviceUI.propTypes = {
  stories: _propTypes2.default.shape({
    dumpStoryBook: _propTypes2.default.func.isRequired,
    on: _propTypes2.default.func.isRequired,
    emit: _propTypes2.default.func.isRequired,
    removeListener: _propTypes2.default.func.isRequired
  }).isRequired,
  events: _propTypes2.default.shape({
    on: _propTypes2.default.func.isRequired,
    emit: _propTypes2.default.func.isRequired,
    removeListener: _propTypes2.default.func.isRequired
  }).isRequired,
  url: _propTypes2.default.string.isRequired
};