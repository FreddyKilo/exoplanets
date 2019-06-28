const express = require('express');
const router = express.Router();
const request = require('request-promise');
const exoplanetsService = require('../service/exoplanets.js');
const exoplanetsUrl = 'https://gist.githubusercontent.com/joelbirchler/66cf8045fcbb6515557347c05d789b4a/raw/9a196385b44d4288431eef74896c0512bad3defe/exoplanets';

/* GET filtered catalogue of discovered exoplanets. */
router.get('/', function (req, res) {
    request.get(exoplanetsUrl)
        .then(function (res) {
            const body = JSON.parse(res);
            res.json(exoplanetsService.getFilteredExoplanetData(body));
        })
        .catch(function (err) {
            res.status(err.statusCode || 500)
                .json({message: "Internal call to exoplanets failed"})
                .end();
        });

});

module.exports = router;