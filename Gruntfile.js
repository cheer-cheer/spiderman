module.exports = function(grunt) {
  const REBOOT_FILE = './.reboot'

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    modernizr: {
      dist: grunt.file.readJSON('modernizr-grunt-config.json')
    },
    bower: {
      install: {
        options: {
          targetDir: './public/lib/',
          layout: 'byComponent',
          verbose: true
        }
      }
    },
    concurrent: { // 设置并行运行的任务
      dev: { // 开发
        tasks: ['nodemon:dev', 'watch:livereload'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    nodemon: { // nodemon 任务 在代码发生修改时重新启动
      dev: {
        script: './bin/www',
        options: {
          callback: function(nodemon) {
            nodemon.on('log', e => {
              grunt.log.writeln(e.colour)
            }).on('config:update', () => {
              setTimeout(function() {
                require('open')('http://localhost:3000')
              }, 1000)
            }).on('restart', () => {
              setTimeout(function() {
                require('fs').writeFileSync(REBOOT_FILE, +new Date() + '')
              }, 1000)
            })
          }
        }
      }
    },
    watch: { // grunt-contrib-watch configuration:
      livereload: { // target `livereload` 
        files: [
          REBOOT_FILE,
          'public/stylesheets/**/*.css',
          'public/js/**/*.js',
          'views/**/*.jade'
        ],
        options: {
          livereload: true // enable livereload
        }
      }
    },
    less: {
      'bootstrap': {
        options: {
          strictMath: true,
          compress: true
        },
        src: './public/lib/bootstrap/less/bootstrap.less',
        dest: './public/lib/bootstrap/css/bootstrap.min.css'
      }
    }
  })

  grunt.registerTask('bootstrap', () => {
    grunt.file.copy('./public/less/bootstrap-variables.less', './public/lib/bootstrap/less/variables.less')
    grunt.task.run(['less:bootstrap'])
  })

  grunt.loadNpmTasks('grunt-contrib-less')
  grunt.loadNpmTasks("grunt-modernizr")
  grunt.loadNpmTasks('grunt-bower-task')
  grunt.loadNpmTasks('grunt-concurrent')
  grunt.loadNpmTasks('grunt-nodemon')
  grunt.loadNpmTasks('grunt-contrib-watch')

  grunt.registerTask('debug', ['concurrent:dev'])
}