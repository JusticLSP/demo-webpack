const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    // 入口
    entry: {
        'main': path.resolve(__dirname, '../src/main.js'),
        'index': path.resolve(__dirname, '../src/js/index.js'),
    },
    // 出口
    output: {
        publicPath: '/',
        filename: devMode ? 'js/[name].[hash:8].js': 'js/[name].[chunkhash:8].js',       //数字8表示取hash标识符的前八位
        chunkFilename: devMode ? 'js/[name].[hash:8].js': 'js/[name].[chunkhash:8].js',  //异步模块的文件输出名
        path: path.resolve(__dirname, '../dist'),
    },

    // 配置loader
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use : [
                    MiniCssExtractPlugin.loader,
                    { loader: "css-loader" },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')({
                                    overrideBrowserslist: ["> 1%", "last 2 versions", "not ie <= 8"]
                                })
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use : [
                    MiniCssExtractPlugin.loader,
                    { loader: "css-loader" },
                    { loader: "less-loader" },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')({
                                    overrideBrowserslist: ["> 1%", "last 2 versions", "not ie <= 8"]
                                })
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(gif|jpg|png|bmp|jpeg)$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      name: 'images/[name].[hash8].[ext]', // 输出文件名称
                      limit: 1024, // 小于limit则转为base64
                      esModule: false, // 禁用esModule, 解决html中img标签的src不正确的问题
                      publicPath: '../',
                    }
                  }
                ]
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                        name: 'fonst/[name].[hash8].[ext]', // 输出文件名称
                    }
                  }
                ]
            }
        ]
    },
    
    // 配置插件
    plugins: [
        new CleanWebpackPlugin(), // 自动删除dist文件
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, '../src/index.html'),
          filename: 'index.html',
          chunks: ['main', 'index'],
          inject: true,
          minify: { // 压缩HTML文件
            removeComments: true, // 移除HTML中的注释
            collapseWhitespace: true, // 删除空白符与换行符
            minifyCSS: true// 压缩内联css
          },
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash:8].css",
        })
    ],

    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: { // 分离第三方库
                  test: /[\\/]node_modules[\\/]/,
                  name: 'common',
                  chunks: 'all'
                },
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    }  
}