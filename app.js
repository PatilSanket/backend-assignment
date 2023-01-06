const express = require('express');
const fetchVideos = require('./utils/dataFetchUtils.js');
const router = require('./routes/videos');
require('dotenv').config();

const app = express();


// Async task of fetching and dumping data in db
setInterval(async () => {
    try {
      await fetchVideos(process.env.YOUTUBE_SEARCH_QUERY);
      console.log('async video fetch');
    } catch (err) {
      console.error(err);
    }
  }, process.env.INTERVAL);

// Using express router for more modular code
app.use("/videos", router);

const port = process.env.PORT || 3000;
// Driver
app.listen(port, () => {
console.log(`Server listening on port ${port}`);
});
    
    
    
    
