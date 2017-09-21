const React = require('react');
const addons = require('@storybook/addons').default;
addons.setPreview(function setPreview() { return React.createElement('div')});

require('storybook-addon-docgen/register');
require('./rn-pair/register');
require('@storybook/addon-knobs/register');
require('storybook-usage/register');
