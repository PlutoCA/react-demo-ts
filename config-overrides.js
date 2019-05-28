const { override, fixBabelImports, addWebpackAlias, addLessLoader } = require('customize-cra')
const path = require('path')

const sassRegex = /\.(scss|sass)$/;

module.exports = function override(config, env) {
    // do stuff with the webpack config...
    // config.output.publicPath = env === 'production' ? '/' : '/'
    config.resolve = {
        alias: {
          '@': path.resolve(__dirname, 'src'),
        }
      };
		const loaders = config.module.rules.find(rule => Array.isArray(rule.oneOf)).oneOf;
		
		const sassLoader = loaders.find(option => option.test.toString() === sassRegex.toString())
		console.log(sassLoader)
		if (sassLoader) {
			sassLoader.use.push({
				loader: require.resolve("sass-resources-loader"),
				options: {
					sourceMap: true,
					resources: [
						path.resolve(__dirname, "src/asset/sass/variable.scss")
					]
				},
			});
		}
    return config;
};

// module.exports = override(
//     // fixBabelImports('import', {
//     //   libraryName: 'antd',
//     //   libraryDirectory: 'es',
//     //   style: 'css',
//     // }),
//     addWebpackAlias({
//       ['@']: path.resolve(__dirname, 'src')
//     }),
//     // addLessLoader({
//     //     rules: [
//     //     {
//     //       test: /\.scss$/,
//     //       use: [
//     //         'style-loader',
//     //         'css-loader',
//     //         'postcss-loader',
//     //         'sass-loader',
//     //         {
//     //           loader: 'sass-resources-loader',
//     //           options: {
//     //             resources: [
//     //                 path.resolve(__dirname, "src/asset/sass/variable.scss")
//     //             ]
//     //           },
//     //         },
//     //       ],
//     //     },
//     //   ]})
//   )