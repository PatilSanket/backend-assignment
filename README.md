Primary tasks:
1.Fetch data from YouTube data API and dump it into database asynchronously in after some given intervals.
2.Write video fetch API in reverse chronological order and a search API with appropriate index.

Environment variables must be stored in .env file which is gitignored from this repo, refer sample.env.

Use npm start to start the server.
Alternatively, use docker with following commands:
1. Use "docker build -t imageName ." to build a image
2. Use "docker run -p 3000:3000 imageName" to run the image.
Now server will listen requests from port 3000 of your local host.

Multiple API keys can be added used in case of expiration of a key. 
Add them in .env as comma separated values(no '' or no spaces are expected between the keys).

Search API is optimised for partial searches with index fields mapped to title and description.

API Endpoints:

1. To fetch videos: /videos/   e.g. http://localhost:3000/videos/?page=2,pageSize=10
2. To search: /videos/search   e.g. http://localhost:3000/videos/search?q=messi