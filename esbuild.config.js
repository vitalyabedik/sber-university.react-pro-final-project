const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const url = require('url');
const http = require('http');
const esbuild = require('esbuild');
const swc = require('@swc/core');
const dotenv = require('dotenv');

const rootDir = __dirname;
const srcDir = path.resolve(rootDir, 'src');
const publicDir = path.resolve(rootDir, 'public');
const outDir = path.resolve(rootDir, 'build-esbuild');
const stylesDir = path.join(outDir, 'static', 'styles');

const { env: envVars, parsed: envFileVars } = dotenv.config({
	path: path.resolve(rootDir, '.env'),
});
const isProd = process.env.NODE_ENV === 'production';
const devPort = Number(process.env.PORT) || 3000;

const contentHash = (content) =>
	crypto.createHash('sha256').update(content).digest('hex').slice(0, 8);

// process.env заменяется целиком — так же, как DefinePlugin/EnvironmentPlugin в webpack
const processEnvDefine = {
	'process.env': JSON.stringify({
		NODE_ENV: isProd ? 'production' : 'development',
		...envVars,
		...envFileVars,
	}),
};

// Исходное (до хэширования) имя файла сборки — по нему index.html находит скрипты и стили
const originalNames = new Map();

// svgLoader: аналог @svgr/webpack + url-loader — именованный ReactComponent и default-URL (data:image/svg+xml)
const svgLoader = {
	name: 'svg-loader',
	setup(build) {
		build.onLoad({ filter: /\.svg$/ }, async ({ path: filePath }) => {
			const svg = await fs.promises.readFile(filePath, 'utf8');
			const componentName = path
				.basename(filePath, '.svg')
				.split(/[^a-zA-Z0-9]+/)
				.filter(Boolean)
				.map((part) => part[0].toUpperCase() + part.slice(1))
				.join('');
			const { code } = await esbuild.transform(svg, {
				loader: 'jsx',
				// без JSX-фрагментов: esbuild не эмитит import "react/jsx-runtime" внутрь стрелочной функции
				jsx: 'transform',
				jsxFactory: componentName,
				jsxFragment: 'Fragment',
			});
			const url = `data:image/svg+xml;base64,${Buffer.from(svg).toString(
				'base64'
			)}`;
			return {
				contents: [
					`const ${componentName} = (props) => ${code.trim()};`,
					`export { ${componentName} as ReactComponent };`,
					`export default ${JSON.stringify(url)};`,
				].join('\n'),
				loader: 'js',
				resolveDir: path.dirname(filePath),
			};
		});
	},
};

// swcPlugin: транспиляция TS/TSX через @swc/core (вместо ts-loader + tsc)
const swcPlugin = {
	name: 'swc-transform',
	setup(build) {
		build.onLoad({ filter: /\.tsx?$/ }, async ({ path: filePath }) => {
			if (filePath.includes('node_modules')) return null;
			const source = await fs.promises.readFile(filePath, 'utf8');
			const { code } = await swc.transform(source, {
				filename: filePath,
				swcrc: false,
				jsc: {
					parser: { syntax: 'typescript', tsx: filePath.endsWith('.tsx') },
					transform: { react: { runtime: 'automatic', development: !isProd } },
					target: 'es2020',
				},
				module: { type: 'es6' },
			});
			return {
				contents: code,
				loader: 'js',
				resolveDir: path.dirname(filePath),
			};
		});
	},
};

const walkFiles = async (dir) => {
	const files = [];
	const entries = await fs.promises.readdir(dir, { withFileTypes: true });
	for (const entry of entries) {
		const entryPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			files.push(...(await walkFiles(entryPath)));
		} else {
			files.push(entryPath);
		}
	}
	return files;
};

const toRelative = (filePath) =>
	path.relative(outDir, filePath).split(path.sep).join('/');

const isHashed = (fileName) => /\.[a-f0-9]{8}\.[^.]+$/.test(fileName);

// contenthash: имя файла получает хэш содержимого
const hashFileName = (fileName, content) =>
	fileName.replace(/(\.[^.]+)$/, `.${contentHash(content)}$1`);

// hashedAssetsPlugin: contenthash в именах JS/картинок/шрифтов, как [contenthash] в webpack
const hashedAssetsPlugin = {
	name: 'hashed-assets',
	setup(build) {
		build.onEnd(async (result) => {
			if (result.errors.length) return;
			for (const filePath of await walkFiles(outDir)) {
				if (!/\.(js|png|jpe?g|gif|webp|woff2?|eot|ttf|otf)$/.test(filePath))
					continue;
				const fileName = path.basename(filePath);
				if (isHashed(fileName)) continue;
				const hashedPath = path.join(
					path.dirname(filePath),
					hashFileName(fileName, await fs.promises.readFile(filePath))
				);
				await fs.promises.rename(filePath, hashedPath);
				originalNames.set(toRelative(hashedPath), toRelative(filePath));
			}
		});
	},
};

// htmlPlugin: аналог html-webpack-plugin — index.html из public/ + подключение скриптов и стилей
const htmlPlugin = {
	name: 'html',
	setup(build) {
		build.onEnd(async (result) => {
			if (result.errors.length) return;
			const tags = [];
			for (const filePath of await walkFiles(outDir)) {
				const relativePath = toRelative(filePath);
				const originalPath = originalNames.get(relativePath) ?? relativePath;
				if (/^static\/scripts\/.+\.js$/.test(originalPath)) {
					tags.push(`<script defer src="/${relativePath}"></script>`);
				}
				if (/\.css$/.test(originalPath)) {
					tags.push(`<link href="/${relativePath}" rel="stylesheet">`);
				}
			}
			const html = (
				await fs.promises.readFile(path.join(publicDir, 'index.html'), 'utf8')
			).replace('</body>', `    ${tags.join('\n    ')}\n</body>`);
			await fs.promises.writeFile(path.join(outDir, 'index.html'), html);
			for (const entry of await fs.promises.readdir(publicDir, {
				withFileTypes: true,
			})) {
				if (entry.name === 'index.html') continue;
				await fs.promises.cp(
					path.join(publicDir, entry.name),
					path.join(outDir, entry.name),
					{
						recursive: true,
					}
				);
			}
		});
	},
};

// hashedStylesPlugin: esbuild кладёт CSS рядом со скриптами — раскладываем в static/styles с хэшем,
// как MiniCssExtractPlugin в webpack
const hashedStylesPlugin = {
	name: 'hashed-styles',
	setup(build) {
		build.onEnd(async (result) => {
			if (result.errors.length) return;
			for (const filePath of await walkFiles(outDir)) {
				if (path.dirname(filePath) === stylesDir) continue;
				if (!filePath.endsWith('.css')) continue;
				const fileName = path.basename(filePath);
				if (isHashed(fileName)) continue;
				await fs.promises.mkdir(stylesDir, { recursive: true });
				const hashedPath = path.join(
					stylesDir,
					hashFileName(fileName, await fs.promises.readFile(filePath))
				);
				await fs.promises.rename(filePath, hashedPath);
				originalNames.set(toRelative(hashedPath), `static/styles/${fileName}`);
			}
		});
	},
};

// index.html не хранит хэшей в dev-режиме, поэтому в start плагины post-processing отключены
const productionPlugins = [
	svgLoader,
	swcPlugin,
	hashedAssetsPlugin,
	hashedStylesPlugin,
	htmlPlugin,
];
const developmentPlugins = [svgLoader, swcPlugin, htmlPlugin];

const buildOptions = {
	absWorkingDir: rootDir,
	entryPoints: [path.resolve(srcDir, 'index.tsx')],
	bundle: true,
	outdir: outDir,
	entryNames: 'static/scripts/[name]',
	assetNames: 'static/images/[name]',
	loader: {
		'.png': 'file',
		'.jpg': 'file',
		'.jpeg': 'file',
		'.gif': 'file',
		'.webp': 'file',
		'.woff': 'file',
		'.woff2': 'file',
		'.eot': 'file',
		'.ttf': 'file',
		'.otf': 'file',
	},
	jsx: 'automatic',
	minify: isProd,
	sourcemap: isProd ? false : 'inline',
	target: isProd
		? ['es2017', 'chrome80', 'firefox78', 'safari14', 'edge80']
		: ['esnext'],
	define: processEnvDefine,
	plugins: isProd ? productionPlugins : developmentPlugins,
	logLevel: 'info',
};

const mimeTypes = {
	'.html': 'text/html; charset=utf-8',
	'.js': 'text/javascript; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
	'.json': 'application/json',
	'.svg': 'image/svg+xml',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.gif': 'image/gif',
	'.webp': 'image/webp',
	'.woff': 'font/woff',
	'.woff2': 'font/woff2',
	'.eot': 'application/vnd.ms-fontobject',
	'.ttf': 'font/ttf',
	'.otf': 'font/otf',
};

// historyApiFallback + статика из build-esbuild — клиентский роутинг работает на прямых ссылках
const serve = () =>
	http
		.createServer((req, res) => {
			const { pathname } = url.parse(req.url);
			const candidates = [
				path.join(outDir, pathname),
				path.join(outDir, `${pathname}.html`),
				path.join(outDir, 'index.html'),
			];
			for (const candidate of candidates) {
				if (!fs.existsSync(candidate) || fs.statSync(candidate).isDirectory())
					continue;
				res.setHeader(
					'Content-Type',
					mimeTypes[path.extname(candidate)] ?? 'application/octet-stream'
				);
				fs.createReadStream(candidate).pipe(res);
				return;
			}
			res.statusCode = 404;
			res.end('Not found');
		})
		.listen(devPort, () =>
			console.log(`esbuild server: http://localhost:${devPort}`)
		);

const build = async () => {
	await fs.promises.rm(outDir, { recursive: true, force: true });
	await esbuild.build(buildOptions);
	console.log('esbuild: production build готов в build-esbuild/');
};

// dev: хэшей в именах нет (index.html не перезаписывается), sourcemap инлайнится, watch пересобирает при изменениях
const start = async () => {
	await fs.promises.rm(outDir, { recursive: true, force: true });
	const context = await esbuild.context(buildOptions);
	await context.watch();
	serve();
};

const [command] = process.argv.slice(2);

(command === 'start' ? start() : build()).catch((error) => {
	console.error(error);
	process.exit(1);
});
