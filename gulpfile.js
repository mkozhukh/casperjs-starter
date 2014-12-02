var gulp = require('gulp');
var gutil = require('gulp-util');
var fs = require("fs");

var clean = require("gulp-clean");
var isWin = /^win/.test(process.platform) ? ".cmd":"";


gulp.task('clean', function(){
  var folder = (gulp.env.images || "./retest")+"/";
  return gulp.src([folder+'failed/*'], { read:false })
    .pipe( clean() );
});


gulp.task("retest", [], function(cb){
  var spawn = require('child_process').spawn;

  var folder = "./retest/";
  var tests = [ folder ];
  if (gutil.env.file){
    tests = [ folder+gutil.env.file+'.js'];
  } else if (gutil.env.folder){
    tests = [ folder+gutil.env.folder+'/'];
  }

  if (gutil.env.images)
    tests.push("--images="+gutil.env.images);

  var casperChild = spawn('casperjs'+isWin, ['test'].concat(tests));

  casperChild.stdout.on('data', function (data) {
    console.log(data.toString().slice(0, -1)); // Remove \n
  });

  casperChild.on('close', function (code) {
    gutil.log("CasperJS: end");
    if (code === 0)
      cb();
    else{
      process.exit(1)
    }
  });

  casperChild.on('error', function (){
    gutil.log("CasperJS: error");
    cb(false);
  });
});

