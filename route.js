var multer = require('multer');

var uploadfunc = (req, res) => {
    console.log(req.files);
    console.log(req.body);
    res.send('ok');
}

module.exports = function(app) {
    app.get("/", (req, res) => {res.render("main");});

    app.post("/upload", multer({dest: process.env.STATIC_DIR}).single('pic'), uploadfunc);
}
