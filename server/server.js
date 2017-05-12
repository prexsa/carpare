const express = require('express');
var bodyParser = require('body-parser');
const app = express();

app.set('port', (process.env.PORT || 8080));
app.use(bodyParser.json({ type: '*/*'}));

require('./routes/routes.js')(app, express);

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});

// Webpack middleware
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./../webpack.config.js');
const bundler = webpack(webpackConfig);

app.use(webpackMiddleware(bundler));

module.exports = app; 