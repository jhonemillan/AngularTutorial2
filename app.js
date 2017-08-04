var express = require('express');
var app = express();
var mongoose = require('mongoose');
var path = require('path');

mongoose.Promise = global.Promise;
const db = "mongodb://developer:developer@ds137207.mlab.com:37207/videoplayer";

mongoose.connect(db,function(err){
    if(err){
        console.error('custom error' + err);
    }
})

app.use(express.static(__dirname + '/client/dist/'));

app.get('*', function (req, res) {
  res.sendfile(path.join(__dirname + '/client/dist/index.html'));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
