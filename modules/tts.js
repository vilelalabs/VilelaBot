
const gTTS = require('gtts');
const { exec } = require('child_process');

//supported languages
/*
    'af': 'Afrikaans', 'sq': 'Albanian',     'ar': 'Arabic',    'hy': 'Armenian',   'ca': 'Catalan',    'zh': 'Chinese',
    'hr': 'Croatian',  'cs': 'Czech',        'da': 'Danish',    'nl': 'Dutch',      'en': 'English',    'eo': 'Esperanto',
    'fi': 'Finnish', ' 'fr': 'French',       'de': 'German',    'el': 'Greek',      'hi': 'Hindi',      'hu': 'Hungarian',
    'is': 'Icelandic', 'id': 'Indonesian',   'it': 'Italian',   'ja': 'Japanese',   'ko': 'Korean',     'la': 'Latin',
    'lv': 'Latvian',   'mk': 'Macedonian',   'no': 'Norwegian', 'pl': 'Polish',     'pt': 'Portuguese', 'ro': 'Romanian',
    'ru': 'Russian',   'sr': 'Serbian',      'sk': 'Slovak',    'es': 'Spanish',    'sw': 'Swahili',    'sv': 'Swedish',
    'ta': 'Tamil',     'th': 'Thai',         'tr': 'Turkish',   'vi': 'Vietnamese', 'cy': 'Welsh'
*/

async function LerTexto(comando, context, client) {
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
        const gtts = new gTTS(texto, lang);
        const audioDir = `${__dirname}/../recursos/audio.mp3`;
        gtts.save(audioDir, () => {
            console.log("> Texto Convertido com sucesso!");
        });

        await TocarSom();

    } catch (err) {
        client.say(client.channels[0], `Poxa ${context.username}, não conheço essa língua que você escolheu!`);
    }

}

async function TocarSom() {
    const audioDir = `${__dirname}/../recursos/audio.mp3`;

    try {
        await exec(`killall audacious`, (err, stdout, stderr) => {
            if (err) {
                console.error(`Error executing command: ${err.message}`);
                return;
            }
            if (stderr) {
                console.error(`Command stderr: ${stderr}`);
                return;
            }
        });
        setTimeout(() => {
            exec(`audacious -Q ${audioDir}`, (err, stdout, stderr) => {
                if (err) {
                    console.error(`Error executing command: ${err.message}`);
                    return;
                }
                if (stderr) {
                    console.error(`Command stderr: ${stderr}`);
                    return;
                }
            });
        }, 1000);

        console.log("> Áudio tocado com sucesso!");
    } catch (error) {
        console.log('> Erro ao tocar o som.');
        console.log(error);
    }
}

module.exports = { LerTexto };
