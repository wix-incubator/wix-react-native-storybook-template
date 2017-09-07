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

var _qrcode = require('qrcode.react');

var _qrcode2 = _interopRequireDefault(_qrcode);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-undef */
var QRCodeComponent = function (_PureComponent) {
  (0, _inherits3.default)(QRCodeComponent, _PureComponent);

  function QRCodeComponent() {
    (0, _classCallCheck3.default)(this, QRCodeComponent);
    return (0, _possibleConstructorReturn3.default)(this, (QRCodeComponent.__proto__ || (0, _getPrototypeOf2.default)(QRCodeComponent)).apply(this, arguments));
  }

  (0, _createClass3.default)(QRCodeComponent, [{
    key: 'render',
    value: function render() {

      var secured = this.props.secured || window.location.protocol === 'https:';
      var port = this.props.port !== false ? (this.props.port || window.location.port) : 'false';
      var value = [this.props.host || window.location.hostname, port, this.props.pairedId, secured ? 'true' : 'false'].join('|');

      return _react2.default.createElement(
        'div',
        { style: _style2.default.wrapper },
        this.props.pairedId && _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'p',
            null,
            'Code: ',
            this.props.pairedId
          ),
          _react2.default.createElement(
            'p',
            null,
            'Scan the code with your phone to pair'
          ),
          _react2.default.createElement(_qrcode2.default, { value: value })
        )
      );
    }
  }]);
  return QRCodeComponent;
}(_react.PureComponent);

QRCodeComponent.propTypes = {
  pairedId: _propTypes2.default.string
};

QRCodeComponent.defaultProps = {
  pairedId: null
};

exports.default = QRCodeComponent;
