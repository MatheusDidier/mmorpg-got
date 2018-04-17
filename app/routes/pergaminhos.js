module.exports = function(application){
    application.get("/pergaminhos", (req, res) => {
        res.render("pergaminhos");
    })
}