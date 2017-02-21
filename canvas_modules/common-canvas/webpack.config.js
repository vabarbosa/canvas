/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2017. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
"use strict";
var path = require("path");

module.exports = {
	context: path.join(__dirname, "/src/"),
	devtool: "#inline-source-map",
	entry: {
		lib: "./common-canvas.jsx"
	},
	output: {
		library: "Common-Canvas",
		libraryTarget: "commonjs2",
		filename: "common-canvas.js",
		path: path.join(__dirname, "/dist"),
		sourceMapFilename: "[file].map",
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				query: {
					presets: ["react", "es2015"]
				}
			}
		]
	},
	resolve: {
		extensions: [".js", ".jsx"]
	}
};
