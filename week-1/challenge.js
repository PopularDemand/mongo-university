const express = require('express')
const app = express()
const engines = require('consolidate')
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const bodyParser = require('body-parser')

app.engine('html', engines.nunjucks)
app.set('view engine', 'html')
app.set('views', __dirname + '/views')
app.use(bodyParser())

MongoClient.connect('mongodb://localhost:27017/video', (err, db) => {
  assert.equal(null, err)
  console.log('successfully connected to mongodb')

  app.get('/', (req, res) => {
    db.collection('movies').find({}).toArray((err, docs) => {
      assert.equal(err, null)
      res.render('movies', { 'movies': docs })
    })
  })

  app.post('/movie', (req, res, next) => {
    let title = req.body.title
    let year = req.body.year
    let desc = req.body.description
    let newMovie = {
      'title': title,
      'year': year,
      'description': desc
    }

    db.collection('movies').insertOne(newMovie)

    res.send(newMovie)
  })

  // app.use creates a fallback route. define AFTER rest of routes
  app.use((req, res) => {
    res.sendStatus(404)
  })

  const server = app.listen(3000, function () {
    const port = server.address().port
    console.log(`server listening on port ${port}`)
  })
})
