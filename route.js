var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.STATIC_DIR + "up/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({ storage: storage });

var uploadfunc = (req, res) => {
    console.log(req.file.filename);
    var data = {
        name: req.file.filename,
        url: "/st/up/" + req.file.filename,
        size: req.file.size
    };
    res.send(JSON.stringify(data));
};

module.exports = function(app) {
    app.get("/", (req, res) => {res.render("main");});

    app.post("/upload/", upload.single('pic'), uploadfunc);
}
