/* importar o mongo db */
var mongo = require("mongodb").MongoClient;
var assert = require("assert");

const url = 'mongodb://localhost:27017';
const dbName = "got";


function query(db, dados) {
    const collection = db.collection(dados.collection);
    switch (dados.operacao) {
        case "inserir":
            collection.insertOne(dados.usuario, dados.callback);
            break;
        case "inserirJogo":
            collection.insertOne(dados.atributo, dados.callback);
            break;
        case "inserirAcao":
            var jogo = db.collection("jogo");
            jogo.update({usuario: dados.acao.usuario}, { $inc: { moeda: dados.acao.moeda } }, { multi: false });
            collection.insertOne(dados.acao, dados.callback);
            break;
        case "revogarAcao":
            var mongodb = require("mongodb");
            collection.remove({_id: new mongodb.ObjectID(dados.id.id_acao)}, dados.callback);
            break;
        case "findJogo":
            collection.findOne({ usuario: dados.usuario }, dados.callback);

            break;
        case "findAcao":
            var data = new Date();
            var momentoAtual = data.getTime();
            collection.find({ usuario: dados.usuario, acao_termina_em: { $gt: momentoAtual } }).toArray(dados.callback);
            break;
        case "find":
            collection.findOne({ usuario: dados.usuario.usuario, senha: dados.usuario.senha }, dados.callback);
            break;
        default:
            break;
    }
}



var cnxMongo = function (dados) {

    mongo.connect(url, function (err, client) {
        assert.equal(null, err);
        const db = client.db(dbName);
        query(db, dados);
        client.close();
    });
};


module.exports = function () {

    return cnxMongo;
}
