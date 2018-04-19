module.exports.jogo = function (application, req, res) {
    console.log("AQUI -> ", req.session.autorizado);
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    if (req.session.autorizado != true) {
        res.render("index", { validacao: [] });
        return;

    } else {

        var cnx = application.config.dbConnection;
        var JogoDAO = new application.app.models.JogoDAO(cnx);
        
       
        

        

        
    }


}

module.exports.sair = function (application, req, res) {
    req.session.destroy((err) => {
        res.render("index", { validacao: [] });

    });

}