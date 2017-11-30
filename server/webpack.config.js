const path = require('path');

const defaultConfig = require('../storybook-react-native/server/config/webpack.config.prod').default;
const customConfig = require('../webpack.config');

const config = customConfig(Object.assign({}, defaultConfig, {
  output: {
    path: path.resolve(__dirname, '../static'),
    filename: 'manager.bundle.js',
  },
}));

const addonsPath = path.resolve(__dirname, 'addons.js');

config.entry.manager.unshift(addonsPath);

module.exports = config;
