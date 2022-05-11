#!/usr/bin/env node

/* eslint-env node */

const Encore = require('@symfony/webpack-encore');

const config  = {
    src  : `./src`,
    dist : './public',
};

Encore
	.setOutputPath(config.dist)
	
    .setPublicPath('/')

	.addEntry(`js/app`, `${config.src}/js/app.js`)
	.addEntry(`css/app`, `${config.src}/scss/app.scss`)

	.configureBabel(config => {
		config.presets.push('@vue/babel-preset-jsx');
	}, {
		exclude : [],
	})

	.enablePostCssLoader()

	.enableSassLoader()

	.enableVueLoader()

	.disableSingleRuntimeChunk()
;

module.exports = Encore.getWebpackConfig();