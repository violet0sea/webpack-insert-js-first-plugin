class InjectCodePlugin {
	apply(compiler) {
		compiler.hooks.emit.tapAsync(
			'InjectCodeplugin',
			(compilation, callback) => {
				const assetsFile = Object.keys(compilation.assets);
				const htmlList = assetsFile.filter(file => {
					return /\w+.html/.test(file);
				});

				htmlList.forEach(filePath => {
					var source = compilation.assets[filePath].source();
					const reg = /<script /;
					const res = source.replace(reg, `<script>console.log('Ibject code');</script>\n<script`);
					compilation.assets[filePath] = {
						source() {
							// 向文件中写入内容
							return res;
						},
						size() {
							return res.length;
						},
					};
				})
				callback();
			},
		);
	}
}
module.exports = InjectCodePlugin;
