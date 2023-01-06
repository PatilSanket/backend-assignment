const express = require('express');
const video = require('../utils/dbUtils.js');

const router = express.Router();


// This route returns the stored videos in a paginated response sorted in descending order of published datetime
router.get('/videos', (req, res) => {
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
router.get('/search', (req, res) => {
    const query = req.query.q;
    
    video.find( 
        {
          $text: {
            $search: query,
          }
        }
    ).sort({'publishedAt': -1}).exec((error, videos) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send(videos);
        }
    });
});

module.exports = router;