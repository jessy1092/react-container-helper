
import webpack from 'webpack';
import express from 'express';
import config  from './webpack.config';

const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
}));

app.use(require('webpack-hot-middleware')(compiler));

app.listen(3000, (err) => {
  if (err) {
    return console.error(err);
  }

  return console.log('Listening at http://localhost:3000/');
});
