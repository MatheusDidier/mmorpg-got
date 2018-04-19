/* importar o mongo db */
var mongo = require("mongodb").MongoClient;
var assert = require("assert");

const url = 'mongodb://localhost:27017';
const dbName = "got";


function query(db, dados) {
    console.log("ESSE É O DADO NA QUERY", dados);
    const collection = db.collection(dados.collection);
    switch (dados.operacao) {
        case "inserir":
            collection.insertOne(dados.usuario, dados.callback);
            break;
        case "inserirJogo":
            collection.insertOne(dados.atributo, dados.callback);
            break;
        case "findJogo":
            collection.findOne({ usuario: dados.usuario }, dados.callback);
            break;

        case "find":
            collection.findOne({ usuario: dados.usuario.usuario, senha: dados.usuario.senha }, dados.callback);
            break;
        default:
            break;
    }
}



var cnxMongo = function (dados) {

    console.log(dados);
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
