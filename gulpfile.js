'use strict';

const gulp = require('gulp'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    debug = require('postcss-debug').createDebugger();

gulp.task('vendor:bower', function () {
    const bower = require('gulp-bower');
    return bower();
});
gulp.task('vendor:register:js', function () {
    const mainBowerFiles = require('main-bower-files'),
        filter = require('gulp-filter');
    return gulp.src(mainBowerFiles(
        {
            paths: {
                bowerDirectory: './vendor_components',
                bowerrc: './.bowerrc',
                bowerJson: './bower.json'
            }
        }))
        .pipe(rename(
            {
                prefix: '10-'
            }
        ))
        .pipe(filter('**/*.js'))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/assets/js'));
});
gulp.task('vendor:lazysizes:plugins', function () {
    return gulp.src('./vendor_components/lazysizes/plugins/unveilhooks/ls.unveilhooks.js')
        .pipe(rename(
            {
                prefix: '20-'
            }
        ))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/assets/js'));
});
gulp.task('vendor:register:css', function () {
    const mainBowerFiles = require('main-bower-files'),
        filter = require('gulp-filter');
    return gulp.src(mainBowerFiles(
        {
            paths: {
                bowerDirectory: './vendor_components',
                bowerrc: './.bowerrc',
                bowerJson: './bower.json'
            }
        }))
        .pipe(rename(
            {
                prefix: '10-'
            }
        ))
        .pipe(filter('**/*.css'))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/assets/css'));
});
gulp.task('vendor:register:slick-theme', function () {
    return gulp.src('./vendor_components/slick-carousel/slick/slick-theme.css')
        .pipe(rename(
            {
                prefix: '10-'
            }
        ))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/assets/css'));
});
gulp.task('vendor:register:slick-others', function () {
    return gulp.src([
        './vendor_components/slick-carousel/slick/**/*.+(eot|svg|ttf|woff)',
        './vendor_components/slick-carousel/slick/ajax-loader.gif'])
        .pipe(gulp.dest('dist/assets/css'));
});

gulp.task('dev:vendor', function () {
    const runSequence = require('run-sequence');
    return runSequence(
        'vendor:bower',
        'vendor:register:js',
        'vendor:lazysizes:plugins',
        'vendor:register:css',
        'vendor:register:slick-theme',
        'vendor:register:slick-others'
    );
});

gulp.task('third:register', function () {
    return gulp.src(['src/third-party/**/*.*', '!src/third-party/scss/*.*'])
        .pipe(rename(
            {
                prefix: '10-'
            }
        ))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/assets'));
});

gulp.task('third:register:scss', function () {
    return gulp.src(['src/third-party/scss/*.*'])
        .pipe(rename(
            {
                prefix: '10-'
            }
        ))
        .pipe(gulp.dest('src/public/assets/scss'));
});

gulp.task('css:dev', ['third:register:scss'], function () {
    const sass = require('gulp-sass'),
        plumber = require('gulp-plumber'),
        postcss = require('gulp-postcss'),
        autoprefixer = require('autoprefixer');

    let plugins = [
        autoprefixer()
    ];

    return gulp.src(['src/public/assets/scss/**/*.scss'])
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.init())
        .pipe(postcss([autoprefixer({add: false, remove: true, browsers: []})]))
        .pipe(postcss(debug(plugins)))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/assets/css/'));
});

gulp.task('js:dev', function () {
    return gulp.src(['src/public/assets/js/**/*.js'])
        .pipe(rename(
            {
                prefix: '30-'
            }
        ))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/assets/js'));
});

gulp.task('img:min:dev', function () {
    const imageMin = require('gulp-imagemin'),
        changed = require('gulp-changed');

    return gulp.src('src/public/assets/img/**/*.+(png|jpg|gif)')
        .pipe(changed('dist/assets/img'))
        .pipe(imageMin(
            {
                progressive: true,
                interlaced: true,
                verbose: true
            })
        )
        .pipe(gulp.dest('dist/assets/img'))
});
gulp.task('img:ico:dev', function () {
    return gulp.src('src/public/favicon.ico')
        .pipe(gulp.dest('dist/'))
});
gulp.task('img:dev', ['img:min:dev', 'img:ico:dev']);
gulp.task('twig:dev', function () {
    const twig = require('gulp-twig'),
        data = require('gulp-data'),
        fs = require('fs'),
        path = require('path');

    return gulp.src('src/resources/views/*.twig')
        .pipe(data(function (file) {
            try {
                let data = fs.readFileSync('src/resources/data/' + path.basename(file.path, '.twig') + '.json', 'utf8');
                return {'data': JSON.parse(data)};
            } catch (e) {
                console.log('Error:', e.stack);
            }
        }))
        .pipe(twig())
        .pipe(gulp.dest('dist'))
});
gulp.task('serve:dev', function () {
    const browserSync = require('browser-sync');
    browserSync.init({
        server: {
            baseDir: './dist',
            serveStaticOptions: {
                extensions: ['html', 'json']
            },
        }
    });
});

gulp.task('dev:sequence', function () {
    const runSequence = require('run-sequence');
    return runSequence(
        //'dev:vendor',
        //'third:register',
        //'css:dev',
        'js:dev'
        //'img:min:dev',
        //'img:ico:dev',
        //'twig:dev'
        //'serve:dev'
    );
});

gulp.task('default', ['dev:sequence']);