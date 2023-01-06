const express = require('express');
const {video} = require('../utils/dbUtils.js');

const router = express.Router();

//connectToDB();

// This route returns the stored videos in a paginated response sorted in descending order of published datetime
router.get('/', async (req, res) => {
    console.log('request received for /videos/');
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
  
    const skip = (page - 1) * pageSize;
    const limit = pageSize;

    video.find()
    .sort({ publishDate: -1 })
    .skip(skip)
    .limit(limit)
    .exec((error, videos) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(videos);
      }
    });

});

// This route returns the search results as per search query
router.get('/search', async (req, res) => {
    const query = req.query.q;
    console.log('request received for /videos/search');
    video.find( 
      {
        '$search': {
          'index': 'searchIndex',    // update this value as per your indexName
          'text': {
            'query': query,
            'path': {
              'wildcard': '*'
            }
          }
        }
      }
    ).exec((error, videos) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send(videos);
        }
    });
});

module.exports = router;