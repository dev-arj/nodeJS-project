const books = require('./books.json');
const _ = require('lodash');
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/MyDb", function (err, db) {
    
    db.collection('library', function (err, collection) {
        
        collection.insert({ id: 1, firstName: 'Steve', lastName: 'Jobs' });
        collection.insert({ id: 2, firstName: 'Bill', lastName: 'Gates' });
        collection.insert({ id: 3, firstName: 'James', lastName: 'Bond' });
        
        

        db.collection('library').count(function (err, count) {
            if (err) throw err;
            
            console.log('Total Rows: ' + count);
        });
    });
                
});

const express = require('express');
const { forEachChild, couldStartTrivia } = require('typescript');
const app = express();

app.use(bodyParser.json());
app.get('/books', function (req, res, next) {
    console.log("/books endpoint has been hit!");
    console.log(books.books.length);
    res.status(200);
    res.send(books);
    next();
});

app.get('/books/:id', function (req, res, next) {
    console.log(`id number ${req.params.id} was searched for!`)
    _.forEach(books.books, function (book) {
        if (book.id = req.params.id) {
            res.send(book);
        }
    });
    next();
});

app.post('/books/add', function (req, res, next) {
    const book = req.body.book ? req.body.book : "";
    const author = req.body.author ? req.body.author : "";
    books.books.push({ "id": books.books.length + 1, "book": book, "author": author });
    console.log(`id number ${books.books.length} was added!`)
    res.status(200);
    res.send(books);
    next();
});

app.post('/books/remove', function (req, res, next) {
    const { id } = req.body;
    console.log(id)
    if (id <= books.books.length) {
    _.forEach(books.books, function (book) {
        console.log(book)
        if (book.id == id) {
            res.send(books.books[id])
            delete books.books[id];
            console.log(`${id} removed from books`)
            res.status(200);
        } else {
            res.status(404);
        }
    });
    }
});

app.listen(3000,
    console.log("Server is listening to Port 3000"));