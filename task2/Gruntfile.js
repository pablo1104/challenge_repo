module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    //uglify
    uglify: {
      options: {
        mangle: false,
        compress: {
          drop_console: true
        }
      },
      js: {
        files: [{
          expand: true,
          cwd: 'src/js',
          src: '**/*.js',
          dest: 'dist/js'
      }]
      },
      js_libs: {
        files: [{
          expand: true,
          cwd: 'src/assets',
          src: '**/*.js',
          dest: 'dist/assets'
      }]
      }      
    },

    processhtml: {
      options: {
        data: {
          
        }
      },
      dist: {
        files: {
          'dist/index.html': ['src/index.html']
        }
      },
      templates: {
        files: [{
          expand: true,
          cwd: 'src/templates',
          src: '**/*.html',
          dest: 'dist/templates'
      }]
      }
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'src/css',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/css',
          ext: '.css'
        }]
      }
    },

    copy: {
      main: {
        src: 'bower_components/normalize.css/normalize.css',
        dest: 'src/css/normalize.css'
      },
      main_2: {
        expand: true,
        src: ['*.css*'],
        cwd: 'bower_components/Skeleton-Sass/css/',
        dest: 'src/css/'
      },
    },
  

 });

 // loadNpmTasks
 grunt.loadNpmTasks('grunt-contrib-uglify');
 grunt.loadNpmTasks('grunt-processhtml');
 grunt.loadNpmTasks('grunt-contrib-cssmin');
 grunt.loadNpmTasks('grunt-contrib-copy');


 // Run Default task(s).
 grunt.registerTask('libs_base_css',['copy']);
 grunt.registerTask('default', ['uglify', 'processhtml','cssmin']);
 grunt.registerTask('libs_base_css',['copy']);
};