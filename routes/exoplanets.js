const express = require('express');
const router = express.Router();
const exoplanetService = require('../service/exoplanets.js');

const request = require('request');

const exoplanetsUrl = 'https://gist.githubusercontent.com/joelbirchler/66cf8045fcbb6515557347c05d789b4a/raw/9a196385b44d4288431eef74896c0512bad3defe/exoplanets';


/* GET filtered catalogue of discovered exoplanets. */
router.get('/', function (req, res, next) {
    request.get(exoplanetsUrl, function (err, resp, body) {
        const responseBody = JSON.parse(body);
        const filteredData = exoplanetService.getFilteredExoplanetData(responseBody);
        res.send(filteredData);
    });
});

module.exports = router;