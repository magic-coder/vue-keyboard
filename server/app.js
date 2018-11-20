var express = require('express')
var app = express()
var apiRoutes = express.Router()

var appData = require('./dataMock.json')
var order = appData

apiRoutes.get('/getOrderModel', function (req, res) {
  res.json({
    errno: 0,
    data: order
  });
})

app.use('/api', apiRoutes)

module.exports = app
