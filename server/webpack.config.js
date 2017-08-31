const babel = require('../storybook-react-native/server/config/babel');
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
          path.resolve(__dirname, '../channels/index.js')
        ),
        //new webpack.NormalModuleReplacementPlugin(
        //  /node_modules\/@storybook\/ui\/dist\/modules\/ui\/components\/down_panel\/index.js/,
        //  path.resolve(__dirname, './ui/down-panel.js')
        //),
        //new webpack.NormalModuleReplacementPlugin(
        //  /node_modules\/@storybook\/ui\/dist\/modules\/ui\/components\/layout\/index.js/,
        //  path.resolve(__dirname, './ui/layout.js')
        //)
      ],
    }
  );
};
