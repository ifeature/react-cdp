'use strict';

const path = require('path');
const http = require('http');
const url = require('url');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const expressValidator = require('express-validator');
const expressSession = require('express-session');

const DB_URL = 'mongodb://localhost:27017/todo-app';
const Schema = mongoose.Schema;
const router = express.Router();

mongoose.Promise = Promise;
mongoose.connect(DB_URL);

const categorySchema = new Schema({
    title: String
}, {
    collection: 'categories'
});

categorySchema.query.byTitle = function () {
    return this.find({ title: this.title });
};

categorySchema.methods.findByTitle = function (callback) {
    return this.model('Category').find({}).byTitle().exec(callback);
};

categorySchema.index({title: 1});
categorySchema.set('autoIndex', false);

const taskSchema = new Schema({
    title: String,
    description: String,
    done: Boolean
}, {
    collection: 'tasks'
});

taskSchema.query.byTitle = function(callback) {
  return this.find({ title: this.title });
};

taskSchema.methods.findByTitle = function(callback) {
  return this.model('Task').find({}).byTitle().exec(callback);
};

taskSchema.index({title: 1});
taskSchema.set('autoIndex', false);

const Category = mongoose.model('Category', categorySchema);
const Task = mongoose.model('Task', taskSchema);

router.get('/search', function (req, res, next) {
    const query = url.parse(req.url, true).query;
    Task.find({ title: query.title, done: JSON.parse(query.done) }).then(result => {
        res.send({ categories: result });
    });
});

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));
app.use(expressSession({secret: 'todo-app', saveUninitialized: false, resave: false}));

app.use('/', router);

// app.use(function(err, req, res, next) {
//   const error = new Error('Not found.');
//   res.status = 404;
//   next(error);
// });
//
// app.use(function(err, req, res, next) {
//   console.log(err.stack);
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   res.status(err.status || 500);
//   res.send({ error: err });
// });

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


http.createServer(app).listen(8080, function () {
    console.log('Server is running on 8080 port');
});
