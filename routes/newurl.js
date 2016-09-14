const express = require('express');
const router = express.Router();
const Url = require('../model/shortUrl');
const validator = require('validator');

router.get('/', function(req, res, next) {

    //extract & check query
    const longUrl = req.query.url;
    const valCheck = ('validation: ', validator.isURL(longUrl));
    if (!valCheck) {
        res.json({
            error: 'invalid url'
        });
    };

    Url.findOne({
        'longUrl': longUrl
    }).then((result) => {
        if (result !== null) {
            response = {
                longUrl: result.longUrl,
                shortUrl: result.shortUrl
            };
            res.json(response);
        } else {
            const data = new Url({
                longUrl: longUrl
            });
            data.save().then((saved) => {
                res.json({
                    longUrl: saved.longUrl,
                    shortUrl: saved.shortUrl
                });
            });
        };
    }).catch((err) => {
      console.log('database error: ', err);
      res.json({
        error: 'unable to process request'
      });
    });
});


module.exports = router;
