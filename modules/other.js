// funções de Easter Eggs --------------------------------------------------------------------

function tabuada(alvo, mensagem, comando, client) {

    if (comando == "!tabuada") {
        client.say(alvo, '/me Digite !tabuada e um número a seguir por exemplo: !tabuada 9');
        return;
    }

    if (mensagem.substring(0, 9) === `!tabuada `) {
        let final = `/me `;

        let valor = mensagem.substring(9);

        valor = parseInt(valor, 10);
        if (valor >= 0 && valor <= 1000000) {
            for (let i = 1; i <= 10; i++)
                final += `[ ${valor} x ${i} = ${valor * i} ]`;
        }
        else {
            final += 'Valor incorreto. Digite um número de 0 a 1 milhão';
        }

        client.say(alvo, final);
        console.log(`* Comando ${comando} executado`);
    }
}

function hello(alvo, mensagem, comando, client) {
    if (comando == "!hello") {
        client.say(alvo, 'Hello World!');
        return;
    }
    else if (comando == "!world") {
        client.say(alvo, 'Você não deveria começar isto com um !hello ???');
        return;
    }
}
function gato(alvo, mensagem, comando, client) {
    if (comando == "!gatinho" || comando == "!gato" || comando == "!cat") {
        client.say(alvo, '⣿⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀ ⣿⣿⣿⠟⠛⠛⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⢋⣩⣉⢻  ⣿⣿⣿⠀⣿⣶⣕⣈⠹⠿⠿⠿⠿⠟⠛⣛⢋⣰⠣⣿⣿⠀⣿  ⣿⣿⣿⡀⣿⣿⣿⣧⢻⣿⣶⣷⣿⣿⣿⣿⣿⣿⠿⠶⡝⠀⣿  ⣿⣿⣿⣷⠘⣿⣿⣿⢏⣿⣿⣋⣀⣈⣻⣿⣿⣷⣤⣤⣿⡐⢿  ⣿⣿⣿⣿⣆⢩⣝⣫⣾⣿⣿⣿⣿⡟⠿⠿⠦⠀⠸⠿⣻⣿⡄⢻  ⣿⣿⣿⣿⣿⡄⢻⣿⣿⣿⣿⣿⣿⣿⣿⣶⣶⣾⣿⣿⣿⣿⠇⣼  ⣿⣿⣿⣿⣿⣿⡄⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⣰  ⣿⣿⣿⣿⣿⣿⠇⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢀⣿  ⣿⣿⣿⣿⣿⠏⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢸⣿  ⣿⣿⣿⣿⠟⣰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⣿  ⣿⣿⣿⠋⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄⣿  ⣿⣿⠋⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⢸  ⣿⠏⣼⣿⣿⣿⣿⣿⣿⣿⣿');
        return;
    }
}

function ttsList(alvo, mensagem, comando, client) {
    if (comando == "!ttslist") {
        client.say(alvo,
            `
            'af': 'Afrikaans', 'sq': 'Albânio', 'ar': 'Árabe', 'hy': 'Armênio', 'ca': 'Catalão', 'zh': 'Chinês',
                'hr': 'Croata', 'cs': 'Tcheco', 'da': 'Dinamarquês', 'nl': 'Holandês', 'en': 'Inglês', 'eo': 'Esperanto',
                'fi': 'Finlandês', 'fr': 'Francês', 'de': 'Alemão', 'el': 'Grego', 'hi': 'Hindu', 'hu': 'Húngaro',
                'is': 'Islandês', 'id': 'Indonésio', 'it': 'Italiano', 'ja': 'Japonês', 'ko': 'Coreano', 'la': 'Latim'
            `);
        client.say(alvo,
            `
                'lv': 'Letão', 'mk': 'Macedoniano', 'no': 'Norueguês', 'pl': 'Polonês', 'pt': 'Português', 'ro': 'Romeno',
                'ru': 'Russo', 'sr': 'Sérvio', 'sk': 'Eslovaco', 'es': 'Espanhol', 'sw': 'Suaíli', 'sv': 'Sueco',
                'ta': 'Tâmil', 'th': 'Tailandês', 'tr': 'Turco', 'vi': 'Vietnamita', 'cy': 'Galês'`
        );
        return;
    }
}


module.exports = {
    tabuada,
    hello,
    gato,
    ttsList
};