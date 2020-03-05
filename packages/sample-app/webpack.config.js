module.exports = {
    devServer: {
        historyApiFallback: true  // redirect all the trafic to `index.html`
    },
    output: {
        publicPath: '/'  // prefix with `/` all the generated resources in or order to resolve properly the generated artifacts.
    }
};
