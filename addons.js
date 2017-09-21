const React = require('react');
const addons = require('@storybook/addons').default;
addons.setPreview(function setPreview() { return React.createElement('div')});

require('react-storybook-addon-docgen/dist/register');
require('./rn-pair/register');
require('@storybook/addon-knobs/register');
require('storybook-usage/register');
