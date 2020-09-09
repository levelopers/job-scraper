const request = require('request');
const cheerio = require('cheerio');
const Job = require('../model/Job')
var mongoose = require('mongoose');

const baseUrl = 'https://ca.indeed.com/jobs?l=Toronto%2C+ON&radius=25'
const locationUrlQuery = '&q=Software+Developer'
const paginationUrlQury = '&start='
const pageNum = 5

module.exports = {
  run: function run() {
    Array(pageNum).fill().forEach((_, index) => {
      request(baseUrl + locationUrlQuery + paginationUrlQury + (index + 1) * 10,
        (err, response, html) => {
          const $ = cheerio.load(html)
          $('.jobsearch-SerpJobCard').each((i, el) => {
            const title = $(el).find('.title').children('a').text().trim()
            const company = $(el).find('.company').text().trim()
            const location = $(el).find('.location').text().trim()
            const summary = $(el).find('.summary').text().trim()
            const id = $(el).attr('data-jk').trim()
            let job = {
              id, title, company, location, summary, hide: false, tags: []
            }
            Job.createJob(job, function (err, data) {
              if (err) {
                console.log(err);
              }
            })
          })
        })

    });
  }
}

function exit() {
  mongoose.disconnect();
}