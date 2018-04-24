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

JogoDAO.prototype.carregarJogo = function (usuario, req, res, msg) {

    var dados = {
        operacao: "findJogo",
        usuario: usuario,
        collection: "jogo",
        callback: function (err, result) {
            console.log("ESSE É O RESULT DO CALLBACK", result);
            res.render("jogo", { img_casa: req.session.casa, atributos: result, msg: msg });
        }
    }

    this._connection(dados);
}

function getMiliSegundos(hora) {
    var milisegundos = hora * 60 * 60 * 1000;
    return milisegundos;
}


JogoDAO.prototype.acao = function (acao, req) {

    var date = new Date();
    var somaMili;

    switch (acao.acao) {
        case "1":
            somaMili = getMiliSegundos(1);
            acao.moeda = -2 * acao.quantidade;
            break;
        case "2":
            somaMili = getMiliSegundos(2);
            acao.moeda = -3 * acao.quantidade;
            break;
        case "3":
            somaMili = getMiliSegundos(5);
            acao.moeda = -1 * acao.quantidade ;
            break;
        case "4":
            somaMili = getMiliSegundos(5);
            acao.moeda = -1 * acao.quantidade;
            break;
    }

    

    acao.acao_termina_em = date.getTime() + somaMili;

    var dados = {
        operacao: "inserirAcao",
        acao: acao,
        collection: "acao",
        callback: function (err, result) {
            console.log("INSERIDO COM SUCESSO!");

        }
    }

    this._connection(dados);
}


JogoDAO.prototype.pergaminhos = function (usuario, res) {

    var dados = {
        operacao: "findAcao",
        usuario: usuario,
        collection: "acao",
        callback: function (err, result) {
            for (let i = 0; i < result.length; i++) {
                console.log("TO VENDO SE TEVE RESULT AÇAO -> ", result[i].acao);
                switch (result[i].acao) {
                    case "1":
                        result[i].acao = "coletando recursos"
                        break;
                    case "2":
                        result[i].acao = "enforcados";
                        break;
                    case "3":
                        result[i].acao = "em treinamento de história";
                        break;
                    case "4":
                        result[i].acao = "em treinamento de magia";
                        break;
                }
                var data = new Date();
                var agora = data.getTime();
                result[i].acao_termina_em -= agora;
                result[i].acao_termina_em = result[i].acao_termina_em < 0 ? "00000" : (Math.round(result[i].acao_termina_em / 1000));
            }
            


            res.render("pergaminhos", { pergaminhos: result});
        }
    }

    this._connection(dados);

}

module.exports = function () {
    return JogoDAO;
}

JogoDAO.prototype.revogarAcao = function(id, res){
    var dados = {
        operacao: "revogarAcao",
        id: id,
        collection: "acao",
        callback: function(err, result){
            res.redirect("jogo?msg=REMOVIDO")
        }
    }

    this._connection(dados);
}