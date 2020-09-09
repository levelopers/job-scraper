var express = require('express');
var router = express.Router();
var Job = require('../model/Job')
var crawler = require('../utils/crawler')


/* GET home page. */
router.get('/', function (req, res, next) {
  Job.getAllJobs(req.query, function (err, j) {
    if (err) {
      console.log(err);
    }
    res.json(j)
  })
});

router.post('/:id', function (req, res, next) {
  const { id } = req.params
  const { title, company, location, summary, tags, hide } = req.body
  console.log(req.body);
  // Job.createOrUpdateJob(id, new Job({
  //   title, company, location, summary, tags, hide
  // }), function (err, job) {
  //   if (err) {
  //     next(err)
  //   }
  //   res.json(job)
  // })
})

router.get('/scrap', function (req, res, next) {
  crawler.run()
  res.redirect('/')
})

module.exports = router;
