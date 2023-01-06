const axios = require('axios');
require('dotenv').config();
const db = require('./dbUtils.js')
const keys = process.env.API_KEYS.split(',');

// This function fetches the latest videos from YouTube for a given search query
let fetchVideos = async (searchQuery) => {
    let response;
    let flag = false;
    try {
        for(let i=0;i<keys.length;i++){
            console.log(`keys: ${keys[i]}`);
            try {
                response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                    params: {
                        key: keys[i],
                        q: searchQuery,
                        type: 'video',
                        part: 'snippet',
                        maxResults: 20
                    }
                });
                flag = true;
                break;
            } catch(err) {
               console.error(`Invalid key ${err}`)
            }
        }
        if(!flag){
            throw new Error('No key was valid');
        }

        const videos = response.data.items;

        // Insert the videos into the database
        await db.collection('videos').insertMany(videos);

        console.log(`Inserted ${videos.length} videos into the database`);
  } catch (error) {
    console.error(error);
  }
}

module.exports = fetchVideos;