module.exports = function(application){
    application.get("/aldeoes", (req, res) => {
        res.render("aldeoes");
    })
}