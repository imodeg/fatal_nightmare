const express = require('express');
const app = express();
const path = require('path');


app.use(require('express').static(__dirname + '/'));
// [START hello_world]
// Say hello!
app.get('/', function (req, res)
{
  //res.sendFile('index.html');
  res.sendFile('index.html', {root: __dirname});
});
// [END hello_world]

if (module === require.main) {
  // [START server]
  // Start the server
  const server = app.listen(process.env.PORT || 8080, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
  // [END server]
}

module.exports = app;