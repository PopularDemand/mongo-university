var express = require('express')
var app = express()
var engines = require('consolidate')

app.engine('html', engines.nunjucks)
app.set('view engine', 'html')
app.set('views', __dirname + '/views')

app.get('/', (req, res) => {
  res.render('hello', {'name': 'Templates'})
})

app.get('/:name', (req, res) => {
  const { name } = req.params
  res.render('hello', {'name': name})
})

// app.use creates a fallback route. define AFTER rest of routes
app.use((req, res) => {
  res.sendStatus(404)
})

var server = app.listen(3000, function () {
  var port = server.address().port
  console.log(`server listening on port ${port}`)
})
