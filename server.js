//Install express server
const express = require('express');
const cors = require('cors');
const  createProxyMiddleware  = require('http-proxy-middleware');

// proxy middleware options
const options = {
  target: 'http://devapi.saved.io', // target host
  changeOrigin: true, // needed for virtual hosted sites
  ws: false, // proxy websockets
  logLevel: 'debug',
};


const exampleProxy = createProxyMiddleware(options);

const app = express();
app.use('/bookmarks', exampleProxy);
app.use(cors());
// Serve only the static files form the dist directory'./node_modules/http-proxy-middleware/lib/index'
app.use(express.static('./dist/image-task-elilink'));





app.get('/*', (req, res) =>
  res.sendFile('index.html', {root: 'dist/image-task-elilink/'})
);
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080)

/* server configuration here */
