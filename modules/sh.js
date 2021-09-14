exports.startSH = startSH;
exports.addSH = addSH;
exports.delSH = delSH;
exports.closeDB = closeDB;
exports.onJoin = onJoin;


var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./recursos/sh.db');

var alreadyIn = []; // guarda os contatos já recebidos do Stream Holics
var streamers = []; // para passar os dados do DB para o array streamers
var shInicializado = false;


function addSH(username, mensagem, target, client) {

    if (username !== 'vilelalabs')
        return;

    // faz tratamento da mensagem
    if (mensagem.substring(0, 7) === `!addsh `) {
        let streamer = mensagem.substring(7);

        //todas minúsculas
        streamer = streamer.toLowerCase();

        if (streamer.length > 0) {

            db.serialize(function (err) {
                //INSERE NOVOS VALORES NA TABELA
                db.run(`INSERT INTO streamers VALUES ('${streamer}')`, function (err) {
                    if (err) {
                        client.say(target, `${streamer} já consta na tabela`);
                        return;
                    }
                    else {
                        client.say(target, `${streamer} adicionado à lista de divulgação do Stream Holics!`);
                    }
                });
            });
        }
    }
}

function delSH(username, mensagem, target, client) {

    if (username !== 'vilelalabs')
        return;

    // faz tratamento da mensagem
    if (mensagem.substring(0, 7) === `!delsh `) {
        let streamer = mensagem.substring(7);

        //todas minúsculas
        streamer = streamer.toLowerCase();

        if (streamer.length > 0) {

            db.serialize(function (err) {
                //REMOVE VALORES DA TABELA
                db.run(`DELETE FROM streamers WHERE streamer = '${streamer}'`, () => {
                    client.say(target, `${streamer} removido da lista de divulgação do Stream Holics!`);
                    // remover da lista de streamers (em RAM)
                });
            });
        }
    }
}

function startSH() {
    //limpa o array de streamers
    streamers = [];

    //CRIA TABELA se ainda não existir
    if (!shInicializado)
        db.run("CREATE TABLE IF NOT EXISTS streamers (streamer TEXT, PRIMARY KEY (streamer))");

    //passa os dados do DB para o array streamers
    db.serialize(function () {
        db.each("SELECT * FROM streamers ORDER BY streamer", function (err, row) {
            streamers.push(row.streamer);
        });
    });
}

function closeDB() {
    db.close();
}

function onJoin(username, client) {

    if (streamers.includes(username) && !alreadyIn.includes(username)) {
        client.say(client.channels[0], `!sh-so @${username}`);
        alreadyIn.push(username);
    }
};