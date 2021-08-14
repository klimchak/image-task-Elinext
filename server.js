//Install express server
const express = require('express');
const cors = require('cors');
const createProxyMiddleware = require('http-proxy-middleware');

// proxy middleware options
const options = {
  target: 'http://devapi.saved.io',
  changeOrigin: true,
  ws: false,
  logLevel: 'debug',
  cookiePathRewrite: {"*": ""}
};
const optionsAccessToken = {
  target: 'https://raindrop.io/oauth',
  changeOrigin: true,
  ws: false,
  logLevel: 'debug',
  cookiePathRewrite: {"*": ""}
};
const optionsCollectionsAndRaindrop = {
  target: 'https://api.raindrop.io/rest/v1',
  changeOrigin: true,
  ws: false,
  logLevel: 'debug',
  cookiePathRewrite: {"*": ""}
};


const exampleProxy = createProxyMiddleware(options);
const proxyAccessToken = createProxyMiddleware(optionsAccessToken);
const proxyCollectionsAndRaindrop = createProxyMiddleware(optionsCollectionsAndRaindrop);

const app = express();
app.use('/bookmarks', exampleProxy);
app.use('/access_token', proxyAccessToken);
app.use('/collection', proxyCollectionsAndRaindrop);
app.use('/collections', proxyCollectionsAndRaindrop);
app.use('/collections/childrens', proxyCollectionsAndRaindrop);
app.use('/raindrop', proxyCollectionsAndRaindrop);
app.use('/raindrops', proxyCollectionsAndRaindrop);
app.use('/user', proxyCollectionsAndRaindrop);
app.use(cors());
// Serve only the static files form the dist directory'./node_modules/http-proxy-middleware/lib/index'
app.use(express.static('./dist/image-task-elilink'));


app.get('/*', (req, res) =>
  res.sendFile('index.html', {root: 'dist/image-task-elilink/'})
);
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080)

/* server configuration here */
