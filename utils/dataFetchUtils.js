const axios = require('axios');
require('dotenv').config();
const {video, connectToDB} = require('./dbUtils.js');
const keys = process.env.API_KEYS.split(',');

connectToDB();

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
                        maxResults: 2
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
        videos.forEach((i) => {
            // Create a new Video document
            const newVideo = new video({
              title: i.snippet.title,
              description: i.snippet.description,
              publishDate: i.snippet.publishedAt,
              thumbnails: i.snippet.thumbnails,
            });
            newVideo.save((error, result) => {
                if (error) {
                    console.log('Something went wrong while saving saving videos in database');
                } else {
                    console.log(`Inserted ${videos.length} videos into the database`);
                }
            });
        })
  } catch (error) {
    console.error(error);
  }
}

module.exports = fetchVideos;