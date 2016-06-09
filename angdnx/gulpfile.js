var gulp        = require("gulp"),
    rimraf      = require("rimraf"),
    gutil      = require("gulp-util"),
    browserify  = require("browserify"),
    source      = require("vinyl-source-stream"),
    buffer      = require("vinyl-buffer"),
    tslint      = require("gulp-tslint"),
    tsc         = require("gulp-typescript"),
    sourcemaps  = require("gulp-sourcemaps"),
    concat      = require("gulp-concat"),
    cssmin      = require("gulp-cssmin"),
    uglify      = require("gulp-uglify"),
    runSequence = require("run-sequence"),
    mocha       = require("gulp-mocha"),
    debug       = require("gulp-debug"),
    Dotnet = require('gulp-dotnet'),
    browserSync = require('browser-sync').create();

var paths = {
  webroot: "./wwwroot/",
  cs:"./**/*.cs",
  ts:"./app/**/*.ts"
};


paths.js = paths.webroot + "app/**/*.js";
paths.minJs = paths.webroot + "app/**/*.min.js";
paths.css = paths.webroot + "css/**/*.css";
paths.minCss = paths.webroot + "css/**/*.min.css";
paths.concatJsDest = paths.webroot + "app/site.min.js";
paths.concatCssDest = paths.webroot + "css/site.min.css";

//1. Copy over the required javascript libraries
gulp.task('copy-lib', function () {
    gulp.src([
    'node_modules/core-js/client/shim.min.js',
    'node_modules/zone.js/dist/zone.js',
    'node_modules/reflect-metadata/Reflect.js',
    'node_modules/systemjs/dist/system.src.js',
    'app/systemjs.config.js'
    ]).pipe(gulp.dest('wwwroot/app/lib/'));
    
        gulp.src([
    'node_modules/@angular/**/*',
    'node_modules/angular2-in-memory-web-api/**/*',
    'node_modules/rxjs/**/*'
    ],{base:'./node_modules/'}).pipe(gulp.dest('wwwroot/app/lib'));
});

//Lint the typescript files and warn the potential problems
gulp.task("ts:lint", function() {
    return gulp.src([
        "app/**/**.ts"
    ])
    .pipe(tslint({ }))
    .pipe(tslint.report("verbose"));
});


//3. Compile the typescript files, minimize and bundle them
var tsProject = tsc.createProject("tsconfig.json");

gulp.task("build:ts", function() {
    return gulp.src([
            "app/**/**.ts",
            "typings/index.d.ts"
        ])
        .pipe(tsc(tsProject))
        .js.pipe(gulp.dest("app/"));
});

gulp.task("clean:js", function (cb) {
  rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
  rimraf(paths.concatCssDest, cb);
});

gulp.task("clean", ["clean:js", "clean:css"]);


gulp.task("bundle", function() {

    var libraryName = "angdnxapp";
    var mainTsFilePath = "app/main.js";
    var outputFolder   = "wwwroot/app/";
    var outputFileName = libraryName + ".min.js";

    var bundler = browserify({
        debug: true,
        standalone : libraryName
    });

    return bundler.add(mainTsFilePath)
        .bundle()
        .pipe(source(outputFileName))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(debug({title:'stacktrace:'}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(outputFolder));
});

gulp.task("copy-assets", function() {
   gulp.src([
    'app/*.html',
    'app/Views/**/*',
    'app/Styles/**/*'
    ],{base:'./app/'}).pipe(gulp.dest('wwwroot/app/'));
});

//<start> Standard Javascript and Css tasks

gulp.task("min:js", function () {
  return gulp.src([paths.js, "!" + paths.minJs], { base: "." })
    .pipe(concat(paths.concatJsDest))
    .pipe(uglify())
    .pipe(gulp.dest("."));
});

gulp.task("min:css", function () {
  return gulp.src([paths.css, "!" + paths.minCss])
    .pipe(concat(paths.concatCssDest))
    .pipe(cssmin())
    .pipe(gulp.dest("."));
});

gulp.task("min", ["min:js", "min:css"]);

//<end> Standard Javascript and CSS tasks

//<start> Dotnet related tasks
gulp.task("build:csharp", function(cb) {
    var options ={
    // current working directory
    cwd: './',
    // how noisy?
    // options: 'debug', 'info', 'error', 'silent'
    logLevel: 'DEBUG',
    // notify on errors
    notify: true
        };
  Dotnet.build(options, cb);
});

var server;

gulp.task('start:api', function(cb) {
  if(!server)
  {
      server = new Dotnet({ cwd: paths.api  });
      server.start('run', cb);
  }
});

function changed(event) {
  gutil.log('File ${event.path} was ${event.type}, running tasks...');
};

//Run this task using "gulp watch-server" to automatically rebuild and load CSharp(C#) code
//as soon as any changes in '.cs' files are detected
gulp.task('watch-server', ['build:csharp'], function() {
  gulp.watch(paths.cs, {interval: 500}, function(){
    runSequence('build:csharp', 'start:api');
  }).on('change', changed);
});

//<end> Dotnet related tasks

//Run this task using "gulp watch-ui" to automatically rebuild UI upon any ts file changes
gulp.task("watch-ui", ["default"], function () {

    browserSync.init({
        server: "."
    });

    gulp.watch([paths.ts], ["default"]);
    gulp.watch(paths.js).on('change', browserSync.reload); 
});

gulp.task('default', ['ts:lint', 'build:ts', 'clean','copy-lib','bundle','copy-assets']);