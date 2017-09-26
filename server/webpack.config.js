const defaultConfig = require('@storybook/react-native/dist/server/config/webpack.config.prod').default;
const customConfig = require('../webpack.config');

module.exports = customConfig(defaultConfig);

