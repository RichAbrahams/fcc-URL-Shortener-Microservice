const express = require('express');
const router = express.Router();
const Url = require('../model/shortUrl');

router.get('/:shortUrl', function(req, res, next) {
  console.log('params: ', req.params.shortUrl);
  Url.findOne({
      'shortUrl': req.params.shortUrl
  }).then((result) => {
      console.log('result:', result);
      if (result === null) {
          res.send('invalid short url');

      } else {
        console.log('redirecting to: ', 'https://' + result.longUrl);
        res.redirect(301, 'https://' + result.longUrl);
      };
  }).catch((err) => {
    console.log(err);
  });
});

router.get('/', function(req, res, next) {
  res.status(404);
  res.send('no url provided!')
});

module.exports = router;
