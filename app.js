var express = require('express');
var path = require('path');
var app = express();
var port = process.env.PORT || 8080;

app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, "./singolo/singolo.html"));
});

app.get('*', (req, res) => {
  console.log(req.path);
  res.sendFile(path.join(__dirname, 'singolo', req.path));
});

app.listen(port, () => console.log(`App listening on port ${port}`));
