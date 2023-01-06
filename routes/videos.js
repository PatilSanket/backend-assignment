const express = require('express');
const assert = require('assert');
require('dotenv').config();

const db = process.env.DB_CONNECTION; 
const router = express.Router();


// This route returns the stored videos in a paginated response sorted in descending order of published datetime
router.get('/videos', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
  
    const skip = (page - 1) * pageSize;
    const limit = pageSize;

    db.collection('videos').find().sort({'publishedAt': -1}).skip(skip).limit(limit).toArray((err, videos) => {
      assert.equal(null, err);
      res.send(videos);
    });
});

// This route returns the search results as per search query
router.get('/search', (req, res) => {
    const query = req.query.q;
    
    db.collection('videos').find({$text: {$search: query}}).sort({'publishedAt': -1}).toArray((err, videos) => {
        assert.equal(null, err);
        res.send(videos);
    });
});

module.exports = router;