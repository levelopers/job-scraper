
var mongoose = require('mongoose');

var JobSchema = mongoose.Schema({
  id: {
    type: String
  },
  title: {
    type: String,
  },
  company: {
    type: String,
  },
  location: {
    type: String,
  },
  summary: {
    type: String,
  },
  tags: [{
    type: String
  }],
  hide: {
    type: Boolean,
    default: false
  }
});

var Job = module.exports = mongoose.model('Job', JobSchema);

module.exports.createJob = function (job, callback) {
  let options = { upsert: true, new: true, setDefaultsOnInsert: true };
  Job.findOneAndUpdate({ id: job.id }, job, options, callback);
}

module.exports.getAllJobs = function (query, callback) {
  let regex = new RegExp(query.title, 'i')
  query.title = regex
  Job.find(query, callback)
}

module.exports.createOrUpdateJob = function (id, newJob, callback) {
  Job.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        title: newJob.title,
        company: newJob.company,
        location: newJob.location,
        summary: newJob.summary,
        hide: newJob.hide,
        tags: newJob.tags
      }
    },
    { new: true },
    callback)
}

module.exports.updateTags = function (id, tags, callback) {
  Job.findOneAndUpdate({ _id: id }, { tags }, callback)
}

module.exports.updateHide = function (id, hide, callback) {
  Job.findOneAndUpdate({ _id: id }, { hide }, callback)
}

