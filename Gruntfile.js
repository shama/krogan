module.exports = function(grunt) {
  
  grunt.initConfig({
    browserify: {
      options: {
        transform: ['brfs'],
      },
      'js/index.js': 'app/js/index.js',
    },
    compass: {
      css: {
        options: {
          importPath: ['node_modules/bootstrap-sass/lib/'],
          sassDir: 'app/css',
          cssDir: 'css',
        },
      },
    },
    watch: {
      js: { files: ['app/js/**/*.js'], tasks: ['browserify'] },
      css: { files: ['app/css/**/*.scss'], tasks: ['compass'] },
      livereload: {
        options: { livereload: true },
        files: ['dist**/*', 'index.html'],
      },
    },
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['browserify', 'compass']);
};