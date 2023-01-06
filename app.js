const express = require('express');
const initConnection  = require('./utils/dbUtils.js');
const fetchVideos = require('./utils/dataFetchUtils.js');
const router = require('./routes/videos');
require('dotenv').config();

// Replace YOUR_API_KEY with your actual API key

const app = express();

initConnection();

setInterval(async () => {
    try {
      await fetchVideos(process.env.YOUR_SEARCH_QUERY);
      console.log('async video fetch');
    } catch (err) {
      console.error(err);
    }
  }, process.env.INTERVAL);

app.use("/", router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
console.log(`Server listening on port ${port}`);
});
    
    
    
    
