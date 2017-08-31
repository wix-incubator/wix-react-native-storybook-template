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

var _QRCode = require('../../components/QRCode');

var _QRCode2 = _interopRequireDefault(_QRCode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QRCodePanel = function (_React$PureComponent) {
  (0, _inherits3.default)(QRCodePanel, _React$PureComponent);

  function QRCodePanel(props) {
    var _ref;

    (0, _classCallCheck3.default)(this, QRCodePanel);

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var _this = (0, _possibleConstructorReturn3.default)(this, (_ref = QRCodePanel.__proto__ || (0, _getPrototypeOf2.default)(QRCodePanel)).call.apply(_ref, [this, props].concat(args)));

    _this.state = {
      pairedId: null
    };

    _this._actionListener = function (action) {
      return _this.addAction(action);
    };
    return _this;
  }

  (0, _createClass3.default)(QRCodePanel, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.channel.on('channelCreated', this._actionListener);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.channel.removeListener('channelCreated', this._actionListener);
    }
  }, {
    key: 'addAction',
    value: function addAction(data) {
      this.setState({
        pairedId: data.pairedId
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_QRCode2.default, this.state);
    }
  }]);
  return QRCodePanel;
}(_react2.default.PureComponent); /* eslint-disable no-underscore-dangle */

exports.default = QRCodePanel;


QRCodePanel.propTypes = {
  channel: _propTypes2.default.object // eslint-disable-line react/forbid-prop-types
};
QRCodePanel.defaultProps = {
  channel: {}
};