const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

app.use(bodyParser.urlencoded({ extended: true }))

const url = 'mongodb://localhost:27017'

MongoClient.connect(url,{useNewUrlParser:true}, (err, client) => {
    if(err) return console.log(err)

    db = client.db('config')

    app.listen(3000, function() {
        console.log('Server running on port 3000')
    })
})

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.post('/cadastra', (req, res) => {
    db.collection('avaliacoes').insertOne(req.body, (err, result) => {
        if(err) return console.log(err)

        res.redirect('/')
    })
})

app.set('view engine', 'ejs')
app.use(express.static('src'));
app.use(express.static('src/img'));