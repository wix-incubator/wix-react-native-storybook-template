#!/usr/bin/env node
'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

var _server = require('../server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.option('-h, --host <host>', 'host to listen on').option('-p, --port <port>', 'port to listen on').option('--haul <configFile>', 'use haul with config file').option('-s, --secured', 'whether server is running on https').option('-c, --config-dir [dir-name]', 'storybook config directory').option('-e, --environment [environment]', 'DEVELOPMENT/PRODUCTION environment for webpack').option('-r, --reset-cache', 'reset react native packager').option('--skip-packager', 'run only storybook server').option('-i, --manual-id', 'allow multiple users to work with same storybook').parse(process.argv);

var projectDir = _path2.default.resolve();
var configDir = _path2.default.resolve(_commander2.default.configDir || './storybook');
var listenAddr = [_commander2.default.port];
if (_commander2.default.host) {
  listenAddr.push(_commander2.default.host);
}

var server = new _server2.default({
  projectDir: projectDir,
  configDir: configDir,
  environment: _commander2.default.environment,
  manualId: _commander2.default.manualId,
  secured: _commander2.default.secured
});

server.listen.apply(server, listenAddr.concat([function (err) {
  if (err) {
    throw err;
  }
  var address = 'http://' + (_commander2.default.host || 'localhost') + ':' + _commander2.default.port + '/';
  console.info('\nReact Native Storybook started on => ' + address + '\n'); // eslint-disable-line no-console
}]));

if (!_commander2.default.skipPackager) {
  var symlinks = [];

  try {
    var findSymlinksPaths = require('react-native/local-cli/util/findSymlinksPaths'); // eslint-disable-line global-require
    symlinks = findSymlinksPaths(_path2.default.join(projectDir, 'node_modules'), [projectDir]);
  } catch (e) {
    console.warn('Unable to load findSymlinksPaths: ' + e.message);
  }

  var projectRoots = (configDir === projectDir ? [configDir] : [configDir, projectDir]).concat(symlinks);

  var cliCommand = 'node node_modules/react-native/local-cli/cli.js start';
  if (_commander2.default.haul) {
    cliCommand = 'node node_modules/.bin/haul start --config ' + _commander2.default.haul + ' --platform all';
  }
  // RN packager
  _shelljs2.default.exec([cliCommand, '--projectRoots ' + projectRoots.join(','), '--root ' + projectDir, _commander2.default.resetCache && '--reset-cache'].filter(function (x) {
    return x;
  }).join(' '), { async: true });
}