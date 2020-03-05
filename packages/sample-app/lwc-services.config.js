// Find the full example of all available configuration options at
// https://github.com/muenzpraeger/create-lwc-app/blob/master/packages/lwc-services/example/lwc-services.config.js
module.exports = {
  resources: [{ from: 'src/resources', to: 'dist/resources' }],
  devServer: {
            port: 3001,
            host: 'localhost',
            open: true,
            stats: 'errors-only',
            noInfo: true,
            contentBase: './src'
        }
};
