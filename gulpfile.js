'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');//ブラウザのライブリロードとブラウザの同期
var sass = require('gulp-sass');//scssのコンパイル
var plumber = require('gulp-plumber');//コンパイルエラーでwatchの停止を防ぐ
var pleeease = require('gulp-pleeease');//ベンダープレフィックスの自動付与
var uglify = require("gulp-uglify");//JSファイルの圧縮
var csscomb = require('gulp-csscomb');//CSSプロパティの自動ソート

// $ gulp browser-sync で実行するタスク
// ローカルサーバーの起動 
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: "./dist/"
			}
	});
});
// $ gulp bs-reload で実行するタスク
// watch対象のファイルに変更があればローカルサーバーをリロード 
gulp.task('bs-reload', function () {
	browserSync.reload();
});





// $ gulp sass で実行するタスク
gulp.task('sass', function () {
	gulp.src('scss/**/*.scss')
	.pipe(plumber())
	.pipe(sass())
	.pipe(csscomb())
	.pipe(pleeease({
		autoprefixer: {
			browsers: ['last 4 versions']
		},
		"mqpacker": true,//メディアクエリをまとめる際はtrueに
		"minifier": false// minify無効 最終圧縮する際はtrueに
	}))
	.pipe(gulp.dest('dist/css/'))
	.pipe(browserSync.reload({stream:true}));
});





// $ gulp js で実行するタスク
// jsファイルの圧縮 srcパス・destパスは適宜変更
gulp.task("js", function() {
	gulp.src('js/*.js')
	.pipe(plumber({
		errorHandler: notify.onError("JSタスクでエラーが発生しました。: <%= error.message %>")
	}))
	.pipe(uglify())
	.pipe(gulp.dest('./dist/js'));
});





// $ gulp copy で実行するタスク
// 作業ディレクトリから公開ディレクトリへファイルコピー srcパス・destパスは適宜変更
gulp.task('copy', function() {
	gulp.src('js/vendor/*')
	.pipe(gulp.dest('./dist/js/vendor'));
});





// $ gulp watch で実行するタスク
gulp.task('watch', function () {
		gulp.watch('./**/*.html', ['bs-reload']);
		gulp.watch('scss/**/*.scss', ['sass']);
		gulp.watch('js/*.js', ['js']);
		gulp.watch('js/vendor/*', ['copy']);
});





gulp.task('default', ['browser-sync','watch']);