// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var buildEnv = process.env.BUILD_ENV
var isDeploy = buildEnv === 'deploy'
var projectName = 'venus'
var index = isDeploy ? path.resolve(__dirname, '../deploy/index.html') : path.resolve(__dirname, '../dist/index.html');
var assetsRoot = isDeploy ?  path.resolve(__dirname, '../deploy') :  path.resolve(__dirname, '../dist');
var assetsPublicPath = isDeploy ? `https://static.zhongyuanib.com/${projectName}/` :'./';
module.exports = {
  projectName: projectName,
  build: {
    env: require('./prod.env'),
    port: 9000,
    index: index,
    assetsRoot: assetsRoot,
    assetsSubDirectory: 'static',
    assetsPublicPath: assetsPublicPath,
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    useVConsole: true,
    host: '0.0.0.0',
    port: 8000,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
    disableHostCheck: true
  }
}
