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
          src : ['src/js/models/todo.js', 'src/js/collections/todos.js', 'src/js/views/todos.js', 'src/js/views/app.js','src/js/routers/router.js','src/js/app.js' ],
          dest : 'dist/js/app.min.js'
        }]
      },
      js_libs: {
        files: [{
          src : ['src/assets/lib/jquery.min.js', 'src/assets/lib/underscore-min.js', 'src/assets/lib/backbone-min.js', 'src/assets/lib/backbone.localStorage-min.js'],
          dest : 'dist/assets/lib.min.js'
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
      }
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'src/assets/css',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/assets/css',
          ext: '.css'
        }]
      }
    }
  

 });

 // loadNpmTasks
 grunt.loadNpmTasks('grunt-contrib-uglify');
 grunt.loadNpmTasks('grunt-processhtml');
 grunt.loadNpmTasks('grunt-contrib-cssmin');



 // Run Default task(s).
 grunt.registerTask('default', ['uglify', 'processhtml','cssmin']);
};