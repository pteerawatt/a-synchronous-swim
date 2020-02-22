const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const url = require('url');


// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;

module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  //console.log('Serving request type ' + req.method + ' for url ' + req.url);

  switch (req.method) {
    case 'GET':

      let fileName = req.url.split('/')[1];
      let fileType = fileName.split('.')[1];\
      if (fileType === 'jpg') {
        try {
          var bg = path.join('.', fileName);
          var s = fs.createReadStream(bg);
          res.writeHead(200, headers);
          s.on('open', function () {
            s.pipe(res);
          });
        } catch (err) {
          res.writeHead(404, headers);
          console.log('no background');
        }
      } else {
        res.writeHead(200, headers);
        let dir = messageQueue.dequeue();
        res.end(dir);
      }
      break;
    case 'POST':
      console.log(res.end('posted'));
      break;
    default:
      res.end();
  }

  next();
  // invoke next() at the end of a request to help with testing!
};
