'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = function (_ref) {
  var projectDir = _ref.projectDir,
      configDir = _ref.configDir,
      options = (0, _objectWithoutProperties3.default)(_ref, ['projectDir', 'configDir']);

  // Build the webpack configuration using the `baseConfig`
  // custom `.babelrc` file and `webpack.config.js` files
  var environment = options.environment || 'DEVELOPMENT';
  var isProd = environment === 'PRODUCTION';
  var currentWebpackConfig = isProd ? _webpackConfig2.default : _webpack4.default;
  var config = (0, _config2.default)(environment, currentWebpackConfig, projectDir, configDir);

  // remove the leading '/'
  var publicPath = config.output.publicPath;
  if (publicPath[0] === '/') {
    publicPath = publicPath.slice(1);
  }

  var compiler = (0, _webpack2.default)(config);
  var devMiddlewareOptions = {
    noInfo: true,
    publicPath: config.output.publicPath,
    watchOptions: config.watchOptions || {}
  };

  var router = new _express.Router();
  var middlewareFn = getMiddleware(configDir);
  middlewareFn(router);

  router.use((0, _webpackDevMiddleware2.default)(compiler, devMiddlewareOptions));

  if (!isProd) {
    router.use((0, _webpackHotMiddleware2.default)(compiler));
  }

  router.get('/', function (req, res) {
    res.send((0, _index2.default)(publicPath, {
      manualId: options.manualId,
      secured: options.secured
    }));
  });

  return router;
};

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _webpack3 = require('./config/webpack.config');

var _webpack4 = _interopRequireDefault(_webpack3);

var _webpackConfig = require('./config/webpack.config.prod');

var _webpackConfig2 = _interopRequireDefault(_webpackConfig);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _index = require('./index.html');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getMiddleware(configDir) {
  var middlewarePath = _path2.default.resolve(configDir, 'middleware.js');
  if (_fs2.default.existsSync(middlewarePath)) {
    var middlewareModule = require(middlewarePath); // eslint-disable-line
    if (middlewareModule.__esModule) {
      // eslint-disable-line
      middlewareModule = middlewareModule.default;
    }
    return middlewareModule;
  }
  return function () {};
}