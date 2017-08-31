'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _ws = require('ws');

var _ws2 = _interopRequireDefault(_ws);

var _middleware = require('./middleware');

var _middleware2 = _interopRequireDefault(_middleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Server = function () {
  function Server(options) {
    var _this = this;

    (0, _classCallCheck3.default)(this, Server);

    this.options = options;
    this.httpServer = _http2.default.createServer();
    this.expressApp = (0, _express2.default)();
    this.expressApp.use((0, _middleware2.default)(options));
    this.httpServer.on('request', this.expressApp);
    this.wsServer = new _ws2.default.Server({ server: this.httpServer });
    this.wsServer.on('connection', function (s, req) {
      return _this.handleWS(s, req);
    });
  }

  (0, _createClass3.default)(Server, [{
    key: 'handleWS',
    value: function handleWS(socket, req) {
      var _this2 = this;

      if (this.options.manualId) {
        var params = req.url ? _querystring2.default.parse(req.url.substr(1)) : {};

        if (params.pairedId) {
          socket.pairedId = params.pairedId; // eslint-disable-line
        }
      }

      socket.on('message', function (data) {
        _this2.wsServer.clients.forEach(function (c) {
          if (!_this2.options.manualId || socket.pairedId && socket.pairedId === c.pairedId) {
            c.send(data);
          }
        });
      });
    }
  }, {
    key: 'listen',
    value: function listen() {
      var _httpServer;

      (_httpServer = this.httpServer).listen.apply(_httpServer, arguments);
    }
  }]);
  return Server;
}();

exports.default = Server;