var express = require('express')

var router = express.Router()

router.get('/', checkPermission, function (req, res, next) {
  res.render('tasks', {
    title: 'Express!'
  })
})

function checkPermission(req, res, next) {
  var spiderId = req.query.spiderId
  if (spiderId == null) {

  }
  console.log(+spiderId)
  next()
}

module.exports = router
