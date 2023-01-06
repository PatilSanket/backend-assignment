const mongoose = require('mongoose');
require('dotenv').config();

const schema = new mongoose.Schema({
  title: String,
  description: String,
  publishDate: Date,
  thumbnails: {
    default: {
      url: String,
      width: Number,
      height: Number,
    },
    medium: {
      url: String,
      width: Number,
      height: Number,
    },
    high: {
      url: String,
      width: Number,
      height: Number,
    },
  },
});

const video = mongoose.model('video', schema);
let connection;

module.exports = {
  video,
  connectToDB: () => {
    if (connection) {
      // Return the existing connection if it exists
      return connection;
    }
    // Create a new connection
    connection = mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    return connection;
  },
};