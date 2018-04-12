import gulp from 'gulp'
import sass from 'gulp-sass'

const scssPath = 'client/assets/scss'
const cssPath = 'client/assets/css'
const compPath = 'client/src/components'
const semanticSassIconsPath = './node_modules/semantic-ui-sass/icons'

gulp.task('sass', function() {
    return gulp.src(scssPath + '/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(cssPath))
})

gulp.task('replace-fonts', function(){
	return gulp.src(semanticSassIconsPath + '/*.{eot,svg,ttf,woff,woff2}')
			.pipe(gulp.dest('./client/dist/fonts'))
})

gulp.task('watch-sass', function() {
    gulp.watch([
			scssPath + '/meta/*',
			scssPath + '/theme/*',
			scssPath + '/common/*',
			scssPath + '/semantic/*',
			scssPath + '/common.scss',
			scssPath + '/style.scss',
			compPath + '/**/*.scss'
		], [ 'sass' ])

		// throws an error when use
    // gulp.watch([ scssPath + '/**/*' ], [ 'sass' ])
})

gulp.task('default', [ 'replace-fonts', 'watch-sass' ])
