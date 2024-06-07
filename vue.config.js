const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

const CompressionPlugin = require('compression-webpack-plugin');


const myPlugin = require('./src/myPlugin/myPlugin')

module.exports = {
  lintOnSave: false, 
  productionSourceMap: false, 
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src')) 

    config.module.rule("images").test(/\.(jpg|jpeg|png|gif|ico)$/) 
      .use("url-loader") 
      .loader("url-loader")
      .options({
        limit: 1024 * 12,
      })
      .end() 
      .use('image-webpack-loader')
      .loader("image-webpack-loader")
      .options({
        disable: process.env.NODE_ENV == 'development' ? true : false, 
        mozjpeg: { quality: 60 }, 
        optipng: { enabled: true }, 
        pngquant: { quality: [0.65, 0.90], speed: 4 }, 
        gifsicle: { interlaced: false }, 
        webp: { quality: 60 } 
      })
      .end() 
      .enforce('post')
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@class': path.resolve(__dirname, 'src/class'),
        '@components': path.resolve(__dirname, 'src/components'),
      }
    }
  },
  configureWebpack: config => {
    
    if (process.env.NODE_ENV !== 'production') return
    return {
      plugins: [
        new CompressionPlugin({ 
          filename: '[path].gz[query]', 
          algorithm: 'gzip', 
          test: /\.js$|\.css$|\.html$|\.ttf$|\.eot$|\.woff$/, 
          threshold: 10240, 
          minRatio: 0.8,
          
          deleteOriginalAssets: false
        }),
        new myPlugin('i-am-params')
      ],
      optimization: {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: Infinity, 
          minSize: 20000, 
          maxSize: 60000, 
          cacheGroups: {
            vendors: {
              test: /[\\/]node_modules[\\/]/, 
              priority: -10, 
              name(module) { 
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                return `npm.${packageName.replace('@', '')}`
              },
            },
          },
        }
      },
      module: {
        rules: [
         
        ],
      }
    }
  },
  devServer: {
    open: true,
    host: "0.0.0.0",
    port: 8080,
    https: false,
    hotOnly: false,
  }
}
