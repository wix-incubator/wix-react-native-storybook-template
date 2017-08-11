const defaultConfig = require('@storybook/react-native/dist/server/config/webpack.config').default;
const customConfig = require('wix-react-native-storybook-server/local/webpack.config');

module.exports = customConfig(defaultConfig);

