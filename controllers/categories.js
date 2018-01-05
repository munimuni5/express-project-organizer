var express = require('express');
var async = require('async');
var router = express.Router();
var db = require('../models');

router.get('/', function(req, res) {
  db.category.findAll().then(function(category){
    res.render('category/all', {category: category}); //second category to be plural?
  });
  // res.send('get all category route');
});

router.get('/:id', function(req, res) {
  // res.send('just one tag route');
  db.category.findOne({
    where: { id: req.params.id},
    include: [db.category]
  }).then(function(tag){
    console.log('category', category);
    res.render('category/single', {category: category});
  });
});

router.delete('/:id', function(req,res){
  // res.send('delete tag route');
  db.category.findOne({
    where: {id: req.params.id},
    include: [db.project]
  }).then(function(category) {
    async.forEach(category.projects, function(p, callback) {
      category.removeProject(p);
      callback(null);
    }, function() {
      //runs when everything is done ^
      db.category.destroy({
        where: {id: req.params.id}
      }).then(function(deletedItem){
        res.send('hi emmy');
      }); //end of destroy
    }); //end of async.forEach
  }); //end of findOne
});


module.exports = router;
