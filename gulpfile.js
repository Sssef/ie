const gulp = require("gulp"),
  sass = require("gulp-sass"),
  concat = require("gulp-concat"),
  autoprefixer = require("gulp-autoprefixer"),
  cleanCSS = require("gulp-clean-css"),
  plumber = require("gulp-plumber"),
  uglify = require("gulp-uglify"),
  del = require("del"),
  gcmq = require("gulp-group-css-media-queries"),
  rename = require("gulp-rename"),
  browserSync = require("browser-sync"),
  cache = require("gulp-cache"),
  notify = require("gulp-notify");

//Page autoreload
gulp.task("browser-sync", function() {
  browserSync({
    server: {
      baseDir: "src"
    },
    notyfy: false
    // tunnel: true,
  });
});

//Project scripts
gulp.task("scripts", function() {
  return (
    gulp
      .src([
        "src/libs/jquery/dist/jquery.min.js",
        "src/libs/carousel/swiper.min.js",
        "src/libs/maskedinput/jquery.maskedinput.min.js",
        "src/libs/scrollTo/PageScroll2id.min.js",
        "src/libs/magnific/jquery.magnific-popup.min.js",
        "src/js/common.js" // Always in the end
      ])
      .pipe(concat("scripts.min.js"))
      // .pipe(uglify()) //Minimazed all js (optional)
      .pipe(gulp.dest("src/js"))
      .pipe(browserSync.reload({ stream: true }))
  );
});

//Sass
gulp.task("sass", function() {
  return gulp
    .src("src/sass/**/*.sass")
    .pipe(plumber())
    .pipe(sass({ outputStyle: "expanded" }).on("error", notify.onError()))
    .pipe(rename({ suffix: ".min", prefix: "" }))
    .pipe(autoprefixer(["last 5 versions"]))
    .pipe(gcmq())
    .pipe(cleanCSS({ level: { 1: { specialComments: 0 } } }))
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.reload({ stream: true }));
});

//Project build
gulp.task("build", ["removedist", "sass", "scripts"], function() {
  var buildFiles = gulp
    .src(["src/*.html", "src/.htaccess"])
    .pipe(gulp.dest("dist"));

  var buildCss = gulp.src(["src/css/main.min.css"]).pipe(gulp.dest("dist/css"));

  var buildJs = gulp.src(["src/js/scripts.min.js"]).pipe(gulp.dest("dist/js"));

  var buildFonts = gulp.src(["src/fonts/**/*"]).pipe(gulp.dest("dist/fonts"));
});

//Tracking
gulp.task("watch", ["sass", "scripts", "browser-sync"], function() {
  gulp.watch("src/sass/**/*.sass", ["sass"]);
  gulp.watch(["libs/**/*.js", "src/js/common.js"], ["scripts"]);
  gulp.watch("src/*.html", browserSync.reload);
});

//Clean
gulp.task("removedist", function() {
  return del.sync("dist");
});
gulp.task("clearcache", function() {
  return cache.clearAll();
});

//Default task: gulp
gulp.task("default", ["watch"]);
