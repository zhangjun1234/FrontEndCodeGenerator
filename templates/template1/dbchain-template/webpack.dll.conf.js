//首先在根目录下创建一个js文件,webpack.dll.conf.js，并写入下方代码
//如果没安装webpack-cli，需要安装一下webpack-cli，因为需要使用webpack的命令
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('terser-webpack-plugin');

module.exports = {
	// 想要打包的模块的数组
	entry: {
		// vendor: ['vuex',], //取出所有依赖单独打包
		vendor: ['element-ui', 'vue/dist/vue.esm.js', 'vuex', 'vue-router', 'clipboard','codemirror','dbchain-js-client'], //取出所有依赖单独打包
	},
	output: {
		path: path.join(__dirname, 'public/vendor'), // 打包后文件输出的位置
		filename: '[name].dll.js', //生成的文件名字 默认为vendor.dll.js
		library: '[name]_library', //生成文件的映射关系，与下面的DLLPlugin配置相对应
	},
	optimization: {
		minimizer: [
			new ExtractTextPlugin({
				cache: true, // 开启缓存
				parallel: true, // 支持多进程
				sourceMap: true,
			}),
			// //压缩 只是为了包更小一点
		],
	},
	plugins: [
		// 使用 ParallelUglifyPlugin 并行压缩输出的 JS 代码
		// new ParallelUglifyPlugin({
		// 	// 传递给 UglifyJS 的参数
		// 	uglifyJS: {
		// 		output: {
		// 			// 最紧凑的输出
		// 			beautify: false,
		// 			// 删除所有的注释
		// 			comments: false,
		// 		},
		// 		compress: {
		// 			// 在UglifyJs删除没有用到的代码时不输出警告
		// 			warnings: false,
		// 			// 删除所有的 `console` 语句，可以兼容ie浏览器
		// 			drop_console: true,
		// 			// 内嵌定义了但是只用到一次的变量
		// 			// collapse_vars: true,
		// 			// 提取出出现多次但是没有定义成变量去引用的静态值
		// 			// reduce_vars: true,
		// 		},
		// 	},
		// }),
		// new ExtractTextPlugin({
		// 	terserOptions: {
		// 		//生产环境自动删除console
		// 		compress: {
		// 			warnings: false, // 若打包错误，则注释这行
		// 			drop_debugger: true,
		// 			drop_console: true,
		// 			pure_funcs: ['//console.log', 'console.log'],
		// 			// pure_funcs: [],
		// 		},
		// 	},
		// 	sourceMap: false,
		// 	parallel: true,
		// }),

		new webpack.DllPlugin({
			//生成一个json文件 里面是关于dll.js的配置信息
			path: path.join(__dirname, 'public/vendor', '[name]-manifest.json'),
			name: '[name]_library', //与上面output中的配置对应
			context: process.cwd(), //上下文环境路径，必须填写，为了与DLLReferencePlugin存在于同一上下文中，否则undefined
		}),
	],
};

//其中UglifyJsPlugin插件可替换为优化1中的插件

//在package.json中配置命令  "dll": "webpack --config ./webpack.dll.conf.js"
//如执行不成功，例webpack is not installed  就安装一下webpack-cli即可

//执行npm run dll命令  在public中会生成vendor文件夹，里面包括vendor.dll.ks和vendor-manifest.json
//tips：每次添加新依赖后，一定要运行npm run dll这个命令一次。

//最后在index.html中引入就可以了<script src="./vendor/vendor.dll.js"></script>
