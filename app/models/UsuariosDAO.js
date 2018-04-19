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

module.exports = function () {
    return UsuariosDAO;
}