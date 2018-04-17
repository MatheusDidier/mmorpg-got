module.exports = function(application){
    application.get("/pergaminhos", (req, res) => {
        application.app.controllers.pergaminhos.pergaminhos(application, req, res);
    })
}