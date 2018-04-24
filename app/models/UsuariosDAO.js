var crypto = require("crypto");

function UsuariosDAO(cnx) {
    this._connection = cnx;
    console.log("CONEXÂO: ");
    console.log(this._connection);
}

UsuariosDAO.prototype.inserirUsuario = function (usuario, res) {
    var senha_cryptografada = crypto.createHash("md5").update(usuario.senha).digest("hex");
    usuario.senha = senha_cryptografada;

    var dados = {
        operacao: "inserir",
        usuario: usuario,
        collection: "usuarios",
        callback: function (err, result) {
            console.log("EXECUTANDO CALLBACK");

            res.redirect("sucesso");
        }
    }


    this._connection(dados);


}

UsuariosDAO.prototype.autenticar = function (usuario, req, res) {
    console.log(usuario);
    var senha_cryptografada = crypto.createHash("md5").update(usuario.senha).digest("hex");
    usuario.senha = senha_cryptografada;

    var dados = {
        operacao: "find",
        usuario: usuario,
        collection: "usuarios",
        callback: function (err, result) {
            if (result) {

                req.session.autorizado = true;
                req.session.usuario = result.usuario;
                req.session.casa = result.casa;

                res.redirect("jogo");
                console.log(req.session.autorizado);
            }
            else {
                req.session.autorizado = false;
                req.session.usuario = undefined;
                req.session.casa = undefined;
                res.redirect("index?user_invalido=S");
            }
        }
    }

    this._connection(dados);

}

module.exports = function () {
    return UsuariosDAO;
}