const express = require('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todo');

const db = mongoose.connection;
const Schema = mongoose.Schema;
const app = express();

mongoose.Promise = Promise;

const categorySchema = new Schema({
	title: String
}, {
	collection: 'categories'
});

categorySchema.index({ title: 1});
categorySchema.set('autoIndex', false);

categorySchema.methods.findByTitle = function(cb) {
	return this.model('Category').find({}).byTitle(this.title).exec(cb);
};

categorySchema.query.byTitle = function(title) {
	return this.find({title});
};

const Category = mongoose.model('Category', categorySchema);

db.on('error', function(err) {
	console.error('connection error:', err);
});

db.once('open', function(callback) {
	console.log('connected');

	const htmlCategory = new Category({
		title: 'HTML'
	});

	Category.find().exec(function(err, res) {
		console.log(res);
	});

	// Category.update(
	// 	{ title: 'CSS' },
	// 	{ $set: { title: 'CSS 3'} },
	// 	{ upsert: true},
	// 	function(err, item) {
	// 		console.log('!!! updated', err, item);
	// 	}
	// );

	// htmlCategory.save(function(err, item) {
	// 	if (err) {
	// 		return console.error('Error: ', err);
	// 	}
	// 	console.log('Category: ', item, ' has been saved successfully.');
	//
	// 	htmlCategory.findByTitle(function(err, categories) {
	// 		console.log('Found: ', categories);
	// 	});
	// });
});

app.use(function(err, req, res, next) {
	consoe.log(err.stack);
	res.status(500).send('Somethins broke!');
});

app.listen(3000, function() {
	console.log('App listening on port 3000');
});
