var express = require('express');
var async = require('async');
var db = require('../models');
var router = express.Router();

// POST /projects - create a new project
router.post('/', function(req, res) {
  var category = [];
      if(req.body.category){
        category = req.body.category.split(',');
      }

  db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployedLink: req.body.deployedLink,
    description: req.body.description
  })
  .then(function(createdProject) {
    if(category.length > 0){
              //do tag stuff
            async.forEach(category, function(c, callback){
              //add tag to tag table
              db.category.findOrCreate({
                where: { content: c.trim()}
              }).spread(function(category, wasCreated){
                if(category){
                  //this part is what adds the relationship in the join table
                  createdProject.addCategory(category);
                }
                //calling this function is like saying this is all done
                callback(null);
              })
            }, function(){
              res.redirect('/projects/' + createdProject.id);
        });
      }
      else {
    res.redirect('/projects/' + createdProject.id);
  }
}).catch(function(err){
  console.log('err', err);
  res.send('uh oh');
});
// res.send(req.body);
});
          // });
        //   .catch(function(error) {
        // res.status(400).render('main/404');
      // });
// });

// GET /projects/new - display form for creating a new project
router.get('/new', function(req, res) {
  res.render('projects/new');
});

// GET /projects/:id - display a specific project
router.get('/:id', function(req, res) {
  db.project.find({
    where: { id: req.params.id }
    // include: [db.category]
  })
  .then(function(project) {
    if (!project) throw Error();
    res.render('projects/show', { project: project });
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

module.exports = router;
