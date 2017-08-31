'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = function (configType, baseConfig, projectDir, configDir) {
  var config = baseConfig;

  // Search for a .babelrc in project directory, config directory, and storybook
  // module directory. If found, use that to extend webpack configurations.
  var babelConfigInConfig = loadBabelConfig(_path2.default.resolve(configDir, '.babelrc'));
  var babelConfigInProject = loadBabelConfig(_path2.default.resolve(projectDir, '.babelrc'));
  var babelConfigInModule = loadBabelConfig('.babelrc');

  var babelConfig = null;
  var babelConfigDir = '';

  if (babelConfigInConfig) {
    logger.info('=> Loading custom .babelrc from config directory.');
    babelConfig = babelConfigInConfig;
    babelConfigDir = configDir;
  } else if (babelConfigInProject) {
    logger.info('=> Loading custom .babelrc from project directory.');
    babelConfig = babelConfigInProject;
    babelConfigDir = projectDir;
  } else {
    babelConfig = babelConfigInModule;
  }

  if (babelConfig) {
    // If the custom config uses babel's `extends` clause, then replace it with
    // an absolute path. `extends` will not work unless we do this.
    if (babelConfig.extends) {
      babelConfig.extends = babelConfigDir ? _path2.default.resolve(babelConfigDir, babelConfig.extends) : _path2.default.resolve(babelConfig.extends);
    }
    config.module.loaders[0].query = babelConfig;
  }

  // This is a feature of `babel-loader` for webpack (not Babel itself).
  // It enables a cache directory for faster-rebuilds
  // `find-cache-dir` will create the cache directory under the node_modules directory.
  config.module.loaders[0].query.cacheDirectory = (0, _findCacheDir2.default)({
    name: 'react-storybook'
  });

  // Check whether addons.js file exists inside the storybook.
  // Load the default addons.js file if it's missing.
  var storybookDefaultAddonsPath = _path2.default.resolve(__dirname, 'addons.js');
  var storybookCustomAddonsPath = _path2.default.resolve(configDir, 'addons.js');
  if (_fs2.default.existsSync(storybookCustomAddonsPath)) {
    logger.info('=> Loading custom addons config.');
    config.entry.manager.unshift(storybookCustomAddonsPath);
  } else {
    config.entry.manager.unshift(storybookDefaultAddonsPath);
  }

  // Check whether user has a custom webpack config file and
  // return the (extended) base configuration if it's not available.
  var customConfigPath = _path2.default.resolve(configDir, 'webpack.config.js');
  if (!_fs2.default.existsSync(customConfigPath)) {
    logger.info('=> Using default webpack setup based on "Create React App".');
    customConfigPath = _path2.default.resolve(__dirname, './config/defaults/webpack.config.js');
  }

  var customConfig = require(customConfigPath); // eslint-disable-line

  if (typeof customConfig === 'function') {
    logger.info('=> Loading custom webpack config (full-control mode).');
    return customConfig(config, configType);
  }

  logger.info('=> Loading custom webpack config.');

  customConfig.module = customConfig.module || {};

  return (0, _extends3.default)({}, customConfig, config, {
    // We need to use our and custom plugins.
    plugins: [].concat((0, _toConsumableArray3.default)(config.plugins), (0, _toConsumableArray3.default)(customConfig.plugins || [])),
    module: (0, _extends3.default)({}, config.module, customConfig.module, {
      loaders: [].concat((0, _toConsumableArray3.default)(config.module.loaders), (0, _toConsumableArray3.default)(customConfig.module.loaders || []))
    })
  });
};

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _json = require('json5');

var _json2 = _interopRequireDefault(_json);

var _findCacheDir = require('find-cache-dir');

var _findCacheDir2 = _interopRequireDefault(_findCacheDir);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// avoid ESLint errors
var logger = console;

function removeReactHmre(presets) {
  var index = presets.indexOf('react-hmre');
  if (index > -1) {
    presets.splice(index, 1);
  }
}

// Tries to load a .babelrc and returns the parsed object if successful
function loadBabelConfig(babelConfigPath) {
  var config = void 0;
  if (_fs2.default.existsSync(babelConfigPath)) {
    var content = _fs2.default.readFileSync(babelConfigPath, 'utf-8');
    try {
      config = _json2.default.parse(content);
      config.babelrc = false;
    } catch (e) {
      logger.error('=> Error parsing .babelrc file: ' + e.message);
      throw e;
    }
  }

  if (!config) return null;

  // Remove react-hmre preset.
  // It causes issues with react-storybook.
  // We don't really need it.
  // Earlier, we fix this by runnign storybook in the production mode.
  // But, that hide some useful debug messages.
  if (config.presets) {
    removeReactHmre(config.presets);
  }

  if (config.env && config.env.development && config.env.development.presets) {
    removeReactHmre(config.env.development.presets);
  }

  return config;
}

// `baseConfig` is a webpack configuration bundled with storybook.
// Storybook will look in the `configDir` directory
// (inside working directory) if a config path is not provided.