const books = require('./books.json');
const _ = require('lodash');
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var dbo;

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    dbo = db.db('library');
});

const express = require('express');
const app = express();

app.use(bodyParser.json());
app.get('/books', function (req, res, next) {
    console.log("/books endpoint has been hit!");
    dbo.collection('books').find({}).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});


app.put('/books/add', function (req, res, next) {
    const book = req.body.book ? req.body.book : "";
    const author = req.body.author ? req.body.author : "";
    var myobj = {book : book, author: author};

    dbo.collection("books").insertOne(myobj, function (err, result) {
        if (err) throw err;
        console.log("1 document inserted");
        console.log(result);
        res.send(result);
    });
});


app.post('/books/remove', function (req, res, next) {
    const book = req.body.book;
    var myquery = { book: book };
    dbo.collection("books").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        console.log(obj);
        res.send(obj);
    });
});

app.listen(3000,
    console.log("Server is listening to Port 3000"));