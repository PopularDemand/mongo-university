const express = require('express')
const app = express()
const engines = require('consolidate')
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

app.engine('html', engines.nunjucks)
app.set('view engine', 'html')
app.set('views', __dirname + '/views')

MongoClient.connect('mongodb://localhost:27017/video', (err, db) => {
  assert.equal(null, err)
  console.log('successfully connected to mongodb')

  app.get('/', (req, res) => {
    db.collection('movies').find({}).toArray((err, docs) => {
      assert.equal(err, null)
      console.log(docs)
      res.render('movies', { 'movies': docs })
    })
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
