db.categories.insert({ title: 'Category1', parent: null, expanded: false, tasks: [], categories: []});
db.categories.insert({ title: 'Category2', parent: null, expanded: false, tasks: [], categories: []});

db.tasks.insert({title: 'lorem54ad5', done: true, description: 'Some description1'});
db.tasks.insert({title: 'lorem2ad5', done: false, description: 'Some description2'});
db.tasks.insert({title: 'lorem', done: false, description: 'Some description3'});