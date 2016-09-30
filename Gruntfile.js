module.exports = function(grunt) {
  const REBOOT_FILE = './.reboot'

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
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
                require('open')('http://localhost:3000');
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
        files: [REBOOT_FILE, 'public/stylesheets/**/*.css', 'public/javascripts/**/*.js', 'views/**/*.jade'],
        options: {
          livereload: true // enable livereload
        }
      }
    }
  })

  grunt.loadNpmTasks('grunt-concurrent')
  grunt.loadNpmTasks('grunt-nodemon')
  grunt.loadNpmTasks('grunt-contrib-watch')

  grunt.registerTask('debug', ['concurrent:dev'])
}