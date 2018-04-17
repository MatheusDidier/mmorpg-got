module.exports = function(application){
    application.get("/aldeoes", (req, res) => {
        application.app.controllers.aldeoes.aldeoes(application, req, res);
    })
}