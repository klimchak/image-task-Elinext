//Install express server
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
// Serve only the static files form the dist directory
app.use(express.static('./dist/image-task-elilink'));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/*', (req, res) =>
  res.sendFile('index.html', {root: 'dist/image-task-elilink/'}),
);
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
// server.js







/* server configuration here */
