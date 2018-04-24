module.exports.index = function (application, req, res) {

    var userInvalido = req.query;
    
    res.render("index", { validacao: [], userInvalido: userInvalido.user_invalido });

}

module.exports.autenticar = function (application, req, res) {
    var dadosForm = req.body;



    req.assert("usuario", "É obrigatório informar o usuário").notEmpty();
    req.assert("senha", "É obrigatorio informar a senha").notEmpty();

    var erros = req.validationErrors();




    if (erros) {
        res.render("index", { validacao: erros });
        return;
    }

    var cnx = application.config.dbConnection;
    var UsuariosDao = new application.app.models.UsuariosDAO(cnx);

    UsuariosDao.autenticar(dadosForm, req, res)






}