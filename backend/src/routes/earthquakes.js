const express = require('express');
const router = express.Router();
const axios = require('axios');
const client = require('../elasticsearch/client');
require("log-timestamp");


router.get('/all', async function (req, res) {
    const passedType = req.query.type;
    const passedMag = req.query.mag;
    const passedLocation = req.query.location;
    const passedDateRange = req.query.dateRange;
    const passedSortOption = req.query.sortOption;
  
    async function sendESRequest() {
      const body = await client.search({
        index: 'earthquakes',
        body: {
          sort: [
            {
              mag: {
                order: passedSortOption,
              },
            },
          ],
          size: 300,
          query: {
            bool: {
              filter: [
                {
                  term: { type: passedType },
                },
                {
                  range: {
                    mag: {
                      gte: passedMag,
                    },
                  },
                },
                {
                  match: { place: passedLocation },
                },
                // for those who use prettier, make sure there is no whitespace.
                {
                  range: {
                    '@timestamp': {
                      gte: `now-${passedDateRange}d/d`,
                      lt: 'now/d',
                    },
                  },
                },
              ],
            },
          },
        },
      });
      res.json(body.hits.hits);
    }
    sendESRequest();
  });
  
  module.exports = router;