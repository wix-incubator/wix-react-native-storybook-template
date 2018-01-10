const babel = require('@storybook/react-native/dist/server/config/babel');
const webpack = require('webpack');
const path = require('path');

module.exports = function getConfig(config) {
  return Object.assign(
    {},
    config,
    {
      plugins: [
        ...(config.plugins || []),
        new webpack.NormalModuleReplacementPlugin(
          /node_modules\/@storybook\/channels\/dist\/index.js/,
          path.resolve(__dirname, './channels/index.js')
        ),
      ],
    }
  );
};
