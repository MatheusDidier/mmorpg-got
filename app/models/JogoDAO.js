function JogoDAO(cnx) {
    this._connection = cnx;
}

JogoDAO.prototype.gerarParametros = function (usuario) {
    atributo = {
        usuario: usuario,
        moeda: 15,
        suditos: 10,
        temor: Math.floor(Math.random() * 1000),
        sabedoria: Math.floor(Math.random() * 1000),
        comercio: Math.floor(Math.random() * 1000),
        magia: Math.floor(Math.random() * 1000)
    }
    var dados = {
        operacao: "inserirJogo",
        atributo: atributo,
        collection: "jogo",
        callback: function (err, result) {
            console.log(result);
        }
    }

    this._connection(dados);

}

JogoDAO.prototype.carregarJogo = function (usuario) {

    var dados = {
        operacao: "findJogo",
        usuario: usuario,
        collection: "jogo",
        callback: function (err, result) {
            console.log("ESSE É O RESULT DO CALLBACK", result);
            res.render("jogo", { img_casa: req.session.casa, atributos: result }); 
        }
    }

    this._connection(dados);
}

module.exports = function () {
    return JogoDAO;
}