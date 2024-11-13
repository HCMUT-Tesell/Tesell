class SiteController {
    // [GET] /
    home(req, res, next) {
        // res.json("HomePage")
        res.json("HomePage Nodemon")
    }
} 

module.exports = new SiteController;

