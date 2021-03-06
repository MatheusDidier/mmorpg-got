module.exports.cadastro = function(application, req, res){
    res.render("cadastro", {validacao: [], dadosForm: {}});
}

module.exports.cadastrar = function(application, req, res) {
    var dadosForm = req.body;

    req.assert("nome", "Nome não pode ser vazio").notEmpty();
    req.assert("usuario", "Usuario não pode ser vazio").notEmpty();
    req.assert("senha", "Senha não pode ser vazio").notEmpty();
    req.assert("casa", "Você precisa selecionar uma casa").notEmpty();

    var erros = req.validationErrors();

    if(erros){
        res.render("cadastro", {validacao: erros, dadosForm: dadosForm});
        return;
    }

    var cnx = application.config.dbConnection;
    console.log("QUEM É VOCE MENININHO!", cnx);


    var UsuariosDAO = new application.app.models.UsuariosDAO(cnx);
    var JogoDAO = new application.app.models.JogoDAO(cnx);

    UsuariosDAO.inserirUsuario(dadosForm, res);
    JogoDAO.gerarParametros(dadosForm.usuario);
    
}

module.exports.sucesso = function(application, req, res){
    res.render("paginaSucesso");
}