var db = require('./models');

db.category.create({
  content: 'node'
}).then(function(category) {
  console.log(category.get());
});


var db = require('./models');

db.project.find({
  where: { id: 1 },
  include: [db.category]
}).then(function(project) {
  // by using eager loading, the project model should have a categories key
  console.log(project.category); //plural categories

  // a createCategory function should be available to this model
  project.createCategory({ content: 'node' }).then(function(category) {
    console.log(category.get());
  });
});
