module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('jit-grunt')(grunt, {
    usebanner: 'grunt-banner'
  });

  grunt.initConfig({

    pkg: grunt.file.readJSON("MutaGrid.json"),
    meta: {
      banner: "/*\n" +
        " *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
        " *  <%= pkg.description %>\n" +
        " *\n" +
        " *  <%= pkg.homepage %>\n" +
        " *  Demo: <%= pkg.demo %>\n" +
        " *\n" +
        " *  Author: <%= pkg.author.name %> |  <%= pkg.author.twitter %>\n" +
        " *  License: <%= pkg.licenses[0].type %>\n" +
        " *  <%= pkg.licenses[0].copyright %>\n" +
        " */\n"
    },
    uglify: {
      options: {
        mangle: false
      },
      init: {
        files: {
          'demo/assets/js/lt-ie-9.min.js': ['bower_components/lt-ie-9/lt-ie-9.js']
        }
      },
      build: {
        files: {
          'mutagrid/dist/libs/lt-ie-9.min.js': ['bower_components/lt-ie-9/lt-ie-9.js']
        }
      }
    },
    cssmin: {
      options: {
        keepSpecialComments: 0,
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      init: {
          files: {
            'demo/assets/css/normalize.min.css': 'bower_components/normalize.css/normalize.css'
          }
      },
      build: {
          files: {
            'mutagrid/dist/libs/normalize.min.css': 'bower_components/normalize.css/normalize.css',
            'mutagrid/dist/mutagrid.min.css': 'mutagrid/dist/mutagrid.css'
          }
      }
    },
    usebanner: {
      taskName: {
        options: {
          position: "top",
          banner: "<%= meta.banner %>",
          linebreak: true
        },
        files: {
          src: [ 'mutagrid/dist/*.css']
        }
      }
    },
    sass: {
      build: {
        options: {
          style: "compact"
        },
        files: [{
          expand: true,
          cwd: "mutagrid/src",
          src: [ "*.scss" ],
          dest: "mutagrid/dist",
          ext: ".css"
        }]
      }
    },
    jade: {
      compile: {
        options: {
          pretty: true
        },
        files: [{
          cwd: "mutagrid/src",
          src: "*.jade",
          dest: "demo",
          expand: true,
          ext: ".html"
        }]
      }
    },
    autoprefixer: {
      options: {
        browsers: ["last 3 versions", "ie 8", "ie 9"],
        cascade: false,
        map: true
      },
      target: {
        src: "mutagrid/dist/*.css"
      },
    },
    watch: {
      options: {
        livereload: true
      },
      jade: {
        files: "mutagrid/src/**/*.jade",
        tasks: ["newer:jade"]
      },
      css: {
        files: ["mutagrid/src/*.scss"],
        tasks: ["newer:sass","newer:autoprefixer"]
      }
    }
  });

  grunt.registerTask("init", ["uglify:init","cssmin:init"]);
  grunt.registerTask("default", ["newer:jade","newer:sass","cssmin:build","watch"]);
  grunt.registerTask("compile", ["uglify:build","cssmin:build","jade","sass","cssmin:build","usebanner"]);

};