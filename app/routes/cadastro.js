module.exports = function(application){
    application.get("/cadastro", (req, res) => {
        res.render("cadastro");
    });
}