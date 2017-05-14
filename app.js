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
    title: String,
    expanded: Boolean,
    parent: Schema.Types.Mixed,
    tasks: [],
    categories: []
}, {
    collection: 'categories',
    strict: false
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
    collection: 'tasks',
    strict: false
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
        res.send({ tasks: result });
    });
});

router.get('/tasks', function(req, res, next) {
    Task.find().then(result => {
        res.send({ tasks: result });
    });
});

router.post('/tasks', function(req, res, next) {
    const task = new Task({
        title: req.body.title,
        done: false
    });
    const categoryId = req.body.category;
    task.save().then(result => {
        Category.findById(categoryId).then(category => {
            console.log('cat', category);
            console.log('result', result);
            category.tasks.push(result._id);
            return category.save();
        });
        res.send({ status: 'success', data: result });
    });
});

router.put('/tasks/:id', function(req, res, next) {
    const taskId = req.params.id;
    const taskTitle = req.body.title;
    const taskDescription = req.body.description;
    const taskDone = req.body.done;

    Task.findByIdAndUpdate(taskId, { title: taskTitle, description: taskDescription, done: taskDone }, { upsert: true, new: true }).then(result => {
        res.send({ status: 'success', data: result });
    });
});

router.get('/categories', function(req, res, next) {
    Category.find().then(result => {
        res.send({ categories: result });
    });
});

router.post('/categories', function(req, res, next) {
    const category = new Category({
        title: req.body.title,
        expanded: false,
        parent: req.body.parent,
        tasks: [],
        categories: []
    });
    const parentId = req.body.parent;

    category.save().then(result => {
        Category.findById(parentId).then(category => {
            category.categories.push(result._id);
            return category.save();
        });
        res.send({ category: result });
    });
});

router.put('/categories/:id', function(req, res, next) {
    const categoryId = req.params.id;
    const categoryTitle = req.body.title;

    Category.findByIdAndUpdate(categoryId, { title: categoryTitle }, { upsert: true, new: true }).then(result => {
        console.log('RES', result);
        res.send({ status: 'success', data: result });
    });
});

router.delete('/categories/:id', function(req, res, next) {
    const categoryId = req.params.id;

    Category.findByIdAndRemove(categoryId).then(result => {
        Category.find({ categories: { $in: [mongoose.Types.ObjectId(categoryId)]}}).then(results => {
            // ???
            console.log('!!!', results);
        });
        res.send({ status: 'success', data: result });
    });
});

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(expressValidator());
app.use(express.static(path.join(__dirname, 'build')));
app.use(expressSession({secret: 'todo-app', saveUninitialized: false, resave: false}));

app.use('/', router);

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


http.createServer(app).listen(8080, function () {
    console.log('Server is running on 8080 port');
});
