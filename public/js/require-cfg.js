(function(require) {
  'use strict'

  require.config({
    baseUrl: 'js/app',
    paths: {
      'jquery': '/lib/jquery/jquery',
      'bootstrap': '/lib/bootstrap/js/bootstrap.min',
      'metisMenu': '/lib/metisMenu/metisMenu',
      'table': '/lib/bootstrap-table/bootstrap-table'
    },
    shim: {
      'bootstrap': {
        deps: ['jquery']
      },
      'table': {
        deps: ['bootstrap']
      }
    }
  })

  // body...
})(window.requirejs)