function UsuariosDAO(cnx) {
    this._connection = cnx;
    console.log("CONEXÂO: ");
    console.log(this._connection);
}

UsuariosDAO.prototype.inserirUsuario = function (usuario, res) {
    var dados = {
        operacao: "inserir",
        usuario: usuario,
        collection: "usuarios",
        callback: function (err, result) {
            console.log("EXECUTANDO CALLBACK");
            res.send("Olá MArilene");
        }
    }


    this._connection(dados);


}

UsuariosDAO.prototype.autenticar = function (usuario, req, res){
    console.log(usuario);
    var dados = {
        operacao: "find",
        usuario: usuario,
        collection: "usuarios",
        callback: function(err, result) {
            if(result){
                
                req.session.autorizado = true;
                req.session.usuario = result.usuario;
                req.session.casa = result.casa;

                res.redirect("jogo");
                console.log(req.session.autorizado);
            }
            else{
                req.session.autorizado = false;
                req.session.usuario = undefined;
                req.session.casa = undefined;
                res.render("index", {validacao: []});
            }
        }
    }

    this._connection(dados);

}

module.exports = function () {
    return UsuariosDAO;
}