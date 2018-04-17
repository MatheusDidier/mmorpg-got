module.exports = function(application){
    application.get("/jogo", (req, res) => {
        application.app.controllers.jogo.jogo(application, req, res);
    })
}