var express = require('express'),
    router = require('./route'),
    ejs = require('ejs-mate'),
    multer = require('multer');

var configureServer = function (app) {
    app.set('port', process.env.PORT);
    app.set('env', process.env.NODE_ENV);

    // Setting default engine for response rendering
    app.set('view engine', 'ejs');
    // 'views' is not views folder but templates, so fuck my life
    app.set('views', './templates/'); // so root folder for templates is set here

    // setting up static files
    app.use('/st', express.static(process.env.STATIC_DIR));

    // disabling CORS
    app.use("*", (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, AcceptContent-Type, " +
            "Content-Range, Content-Disposition, Content-Description");

        if (req.method == "OPTIONS") {
            res.status(200).end();
        }
        else {
            next();
        }
    });


    router(app);
};

module.exports = configureServer;
