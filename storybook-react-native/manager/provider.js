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

var _ui = require('@storybook/ui');

var _channelWebsocket = require('@storybook/channel-websocket');

var _channelWebsocket2 = _interopRequireDefault(_channelWebsocket);

var _addons = require('@storybook/addons');

var _addons2 = _interopRequireDefault(_addons);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _PreviewHelp = require('./components/PreviewHelp');

var _PreviewHelp2 = _interopRequireDefault(_PreviewHelp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReactProvider = function (_Provider) {
  (0, _inherits3.default)(ReactProvider, _Provider);

  function ReactProvider(_ref) {
    var domain = _ref.url,
        options = _ref.options;
    (0, _classCallCheck3.default)(this, ReactProvider);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ReactProvider.__proto__ || (0, _getPrototypeOf2.default)(ReactProvider)).call(this));

    _this.options = options;
    _this.selection = null;
    try {
      _this.channel = _addons2.default.getChannel();
    } catch (err) {
      _this.channel = undefined;
    }

    var secured = options.secured;
    var websocketType = secured ? 'wss' : 'ws';
    var url = websocketType + '://' + domain;
    if (options.manualId) {
      var pairedId = (0, _uuid2.default)();

      _this.pairedId = pairedId;
      url += '/pairedId=' + _this.pairedId;
    }

    if (!_this.channel) {
      _this.channel = (0, _channelWebsocket2.default)({ url: url });
      _addons2.default.setChannel(_this.channel);

      _this.channel.emit('channelCreated', {
        pairedId: _this.pairedId,
        secured: secured,
        host: options.host,
        port: options.port,
      });
    }
    return _this;
  }

  (0, _createClass3.default)(ReactProvider, [{
    key: 'getPanels',
    value: function getPanels() {
      return _addons2.default.getPanels();
    }
  }, {
    key: 'renderPreview',
    value: function renderPreview(kind, story) {
      this.selection = { kind: kind, story: story };
      this.channel.emit('setCurrentStory', { kind: kind, story: story });
      var renderPreview = _addons2.default.getPreview();

      var innerPreview = renderPreview ? renderPreview(kind, story) : null;

      return innerPreview || _react2.default.createElement(_PreviewHelp2.default, null);
    }
  }, {
    key: 'handleAPI',
    value: function handleAPI(api) {
      var _this2 = this;

      api.onStory(function (kind, story) {
        _this2.selection = { kind: kind, story: story };
        _this2.channel.emit('setCurrentStory', _this2.selection);
      });
      this.channel.on('setStories', function (data) {
        api.setStories(data.stories);
      });
      this.channel.on('getCurrentStory', function () {
        _this2.channel.emit('setCurrentStory', _this2.selection);
      });
      this.channel.emit('getStories');
      _addons2.default.loadAddons(api);
    }
  }]);
  return ReactProvider;
}(_ui.Provider);

exports.default = ReactProvider;
