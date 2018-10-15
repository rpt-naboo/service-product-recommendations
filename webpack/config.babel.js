import path from 'path';
export default {
	devtool: 'eval-source-map',
  entry: path.join(process.cwd(), 'src/index'),
  output: {
    filename: 'bundle.js',
    path: path.join(process.cwd(), 'public', 'js'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
			  use: {
			    loader: 'babel-loader',
			    options: {
			      plugins: ['transform-inline-environment-variables'],
			    },
			  },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        use: 'svg-inline-loader',
      },
      {
        test: /\.(jpe?g|png|gif|ico)$/i,
        use: 'file-loader',
      },            
    ],
  },  
  target: 'web',
};