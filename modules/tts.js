
const gTTS = require('gtts');
const sound = require('sound-play');


//usando para converter texto para áudio
var gtts;

function LerTexto(comando, context, client) {
    let lang = 'pt';
    let texto = ' ';

    // caso o comando não seja !tts não executa a função
    if (comando.substring(0, 4) != '!tts') {
        return;
    }

    if (comando.substring(4, 5) == ' ') {
        lang = 'pt-br';
        texto = comando.substring(5);
    }
    else if (comando.substring(4, 5) == '-') {
        lang = comando.substring(5, 7);
        texto = comando.substring(7);
    }
    else {
        return;
    }

    //testar habilitação para escolha de linguas diferentes

    try {
        gtts = new gTTS(texto, lang);
        gtts.save(`${__dirname}/../recursos/audio.mp3`, () => {
            console.log("> Texto Convertido com sucesso!");
        });

        TocarSom(); // roda o áudio obtido da mensagem

    } catch (err) {
        client.say(client.channels[0], `Poxa ${context.username}, não conheço essa língua que você escolheu!`);
    }

}

function TocarSom() {
    try {
        setTimeout(() => {
            sound.play(`${__dirname}/../recursos/audio.mp3`);
        }, 4800);
        console.log("> Áudio tocado com sucesso!");
    } catch (error) {
        console.log('> Erro ao tocar o som.');
        console.log(error);
    }
}

module.exports = { LerTexto };
