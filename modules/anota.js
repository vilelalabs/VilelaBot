exports.addAnotacao = addAnotacao;
exports.lerAnotacoes = lerAnotacoes;
exports.closeDB = closeDB;

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./recursos/anota.db');
//var db = new sqlite3.Database(':memory:');

function addAnotacao(target, username, mensagem, client) {

    // faz tratamento da mensagem
    if (mensagem.substring(0, 7) === `!anota `) {
        let anotacao = mensagem.substring(7);
        if (anotacao.length > 0) {

            db.serialize(function () {
                //CRIA TABELA se ainda não existir
                db.run("CREATE TABLE IF NOT EXISTS anota (user,info)");

                //INSERE NOVOS VALORES NA TABELA
                db.run(`INSERT INTO anota VALUES ('${username}','${anotacao}')`);

            });

            client.say(target, `Valeu! Incluí sua dica na minha lista de anotações!`);

        }
    }
}

function lerAnotacoes(username, mensagem) {

    if (username !== 'vilelalabs')
        return;
    // faz tratamento da mensagem
    if (mensagem === `!lernotas`) {

        // VISUALIZA RESULTADOS
        db.each("SELECT rowid AS id, user, info FROM anota", function (err, row) {
            console.log(`${row.id} |${row.user}| ${row.info}`);
        });
    }
}

function closeDB() {
    db.close();
}