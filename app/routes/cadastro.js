module.exports = function(application){
    application.get("/cadastro", (req, res) => {
        application.app.controllers.cadastro.cadastro(application, req, res);
    });

    application.post("/cadastrar", (req, res) => {
        application.app.controllers.cadastro.cadastrar(application, req, res);
    })

    application.get("/sucesso", (req, res) => {
        application.app.controllers.cadastro.sucesso(application, req, res);
    })
}