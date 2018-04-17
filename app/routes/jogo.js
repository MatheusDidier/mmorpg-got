module.exports = function(application){
    application.get("/jogo", (req, res) => {
        res.render("jogo");
    })
}