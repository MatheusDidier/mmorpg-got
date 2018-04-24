module.exports.jogo = function (application, req, res) {
    console.log("AQUI -> ", req.session.autorizado);
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    if (req.session.autorizado != true) {
        res.render("index", { validacao: [] });
        return;
    }

    var cnx = application.config.dbConnection;
    var JogoDAO = new application.app.models.JogoDAO(cnx);
    JogoDAO.carregarJogo(req.session.usuario, req, res, req.query.msg);



}

module.exports.sair = function (application, req, res) {
    req.session.destroy((err) => {
        res.render("index", { validacao: [] });

    });

}


module.exports.aldeoes = function (application, req, res) {
    if (req.session.autorizado != true) {
        res.render("index", { validacao: [] });
        return;
    }
    res.render("aldeoes");
}

module.exports.pergaminhos = function (application, req, res) {
    if (req.session.autorizado != true) {
        res.render("index", { validacao: [] });
        return;
    }

    var cnx = application.config.dbConnection;
    var JogoDAO = new application.app.models.JogoDAO(cnx);

    JogoDAO.pergaminhos(req.session.usuario, res);


}

module.exports.ordenar_acao_sudito = function (application, req, res) {
    if (req.session.autorizado != true) {
        res.render("index", { validacao: [] });
        return;
    }
    var dadosForm = req.body;
    req.assert("acao", "Ação deve ser informada").notEmpty();
    req.assert("quantidade", "Quantidade deve ser informada").notEmpty();

    var erros = req.validationErrors();

    if (erros) {
        res.redirect("jogo?msg=F");
        return;
    }

    var cnx = application.config.dbConnection;
    var JogoDAO = new application.app.models.JogoDAO(cnx);
    dadosForm.usuario = req.session.usuario;
    JogoDAO.acao(dadosForm, req);

    res.redirect("jogo?msg=S")


}

module.exports.revogar_acao = function (application, req, res) {
    var url_query = req.query;
    
    var cnx = application.config.dbConnection;
    var JogoDAO = new application.app.models.JogoDAO(cnx);
    JogoDAO.revogarAcao(url_query, res);
    
}