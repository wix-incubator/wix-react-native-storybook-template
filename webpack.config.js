const defaultConfig = require('@storybook/react-native/dist/server/config/webpack.config').default;
const babel = require('@storybook/react-native/dist/server/config/babel');
const webpack = require('webpack');
const path = require('path');

module.exports = Object.assign(
  {}, defaultConfig, {
    plugins: [
      new webpack.NormalModuleReplacementPlugin(
        /node_modules\/@storybook\/ui\/dist\/modules\/ui\/components\/down_panel\/index.js/,
        path.resolve(__dirname, './ui/down-panel.js')
      ),
      new webpack.NormalModuleReplacementPlugin(
        /node_modules\/@storybook\/ui\/dist\/modules\/ui\/components\/layout\/index.js/,
        path.resolve(__dirname, './ui/layout.js')
      )
    ],
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: require.resolve('babel-loader'),
          query: babel,
          include: [
            require.resolve('@storybook/ui/dist/modules/ui/components/down_panel/index.js'),
            require.resolve('@storybook/ui/dist/modules/ui/components/layout/index.js'),
          ],
        }
      ]
    }
  }
);
