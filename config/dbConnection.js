/* importar o mongo db */
var mongodb = require('mongodb');

module.exports = function () {
    
    return cnxComMongo;
}

function cnxComMongo(){
    console.log("CONEXÃO COM BANCO CRIADA");
    var db = new mongo.Db("got",
        new mongo.Server("localhost", 27017, {}),
        {}
    );
    return db;
}