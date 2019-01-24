// 4DSight HTML Gulp workflow

// define workflow defaults
var defaults = {
    sourceFolder 	: 'components/',
    appFolder 		: 'build/',
    fontScssTarget  : '../../../../components/scss/lib/_font-icons.scss'
};


// Defining developer dependencies
var gulp 			= require('gulp');
var gutil 			= require('gulp-util');
var gulpif          = require('gulp-if');
var sass 			= require('gulp-sass');
var minifyCss       = require('gulp-minify-css');
var uglify          = require('gulp-uglify');
var sourcemaps      = require('gulp-sourcemaps');
var browserify 		= require('gulp-browserify');
var notifier 		= require('node-notifier');
var livereload 		= require('gulp-livereload');
var iconFont		= require('gulp-iconfont');
var iconFontCss		= require('gulp-iconfont-css');

//environment
var development = (process.env.development === 'true') || false;


// Defining tasks
var taskList = ['iconfont','sass','browserify','watch'];
gulp.task('default' , taskList);



// Gulp Task: compiling scssSources only from scss root folder
gulp.task('sass', function(){
    gulp.src(defaults.sourceFolder + 'scss/*.scss')
        .pipe(sourcemaps.init()) // initalize source map
        .pipe(sass({
            // include bourbon library
            includePaths: require('node-bourbon').includePaths
        }).on('error',function(error){ // on error...

            //writing errors to terminal
            gutil.log('\n'+ error.messageFormatted);

            // throw error notify
            notifier.notify({
                title: 'SASS compile error',
                message: error.message + '\nFile:' + error.file + ':' + error.line + ':' + error.column,
                sound: true
            });

        }))
        .pipe(gulpif( !development, minifyCss() )) // minify css output
        .pipe(sourcemaps.write('./')) // writing .map file
        .pipe(gulp.dest(defaults.appFolder + 'cdn/css/')) // writing css file
        .pipe(livereload());
});
//------------



// Gulp Task: converting svg vector images to font
gulp.task('iconfont', function(){
    gulp.src([defaults.sourceFolder + 'svg/**/*.svg'], {base: defaults.appFolder})
        .pipe(iconFontCss({
            fontName: 'icons',
            appendCodepoints: true,
            path: defaults.sourceFolder + 'templates/fonts.scss', // scss template
            targetPath: defaults.fontScssTarget,// scss file target
            fontPath: '../fonts/icons/' // font paths in scss file
        }))
        .pipe(iconFont({
            fontName: 'icons',
            normalize: true, // for dynamic svg heights
            fontHeight: 500 // for font quality
        }))
        .on('codepoints', function(codepoints, options) {
            // CSS templating, e.g.
            // console.log(codepoints, options);
        })
        .pipe(gulp.dest(defaults.appFolder + 'cdn/fonts/icons/'));
});

// Gulp Task: refreshing htmls
gulp.task('html',function(){
    gulp.src(defaults.appFolder + '**/*.html').pipe(livereload());
});
//------------



// Gulp Task: browserify jsSources only from js root folder
gulp.task('browserify', function(){
    return gulp.src(defaults.sourceFolder + 'scripts/*.js')
        .pipe(browserify({debug:!development}).on('error',function(error){
            //this.emit('end');
            console.log(error);
        }))
        .pipe(gulpif( !development, uglify() ))
        .pipe(gulp.dest(defaults.appFolder + 'cdn/js/'))
        .pipe(livereload());
});
//------------


// Gulp Task: watching folders
gulp.task('watch',function(){

    livereload.listen({quiet:true});

    //
    gulp.watch(defaults.sourceFolder + 'svg/**/*.svg' , ['iconfont']);

    //
    gulp.watch(defaults.appFolder + '**/*.html' , ['html']);

    //
    gulp.watch(defaults.sourceFolder + 'scss/**/*.scss' , ['sass']);

    gulp.watch(defaults.sourceFolder + 'scripts/**/*.js' , ['browserify']);


});
//------------