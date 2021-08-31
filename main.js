/*
    - Versão 2.0 do VilelaBot
*/

const tmi = require('tmi.js');          // biblioteca para uso da conexão com a twitch

const auth = require('./modules/auth');      // arquivo contendo as autenticações
const other = require('./modules/other');
const sh = require('./modules/sh');
const ad = require('./modules/ad');
const tts = require('./modules/tts')

var ad_start = false; //Habilita/Desabilita ads automaticos

var BOT_USERNAME = 'vilelabot'
var CHANNEL_NAME = 'vilelalabs'
var OAUTH_TOKEN = auth.getAuth('twitch');

// Define opções de configuração
const opts = {
    identity: {
        username: BOT_USERNAME,
        password: OAUTH_TOKEN
    },
    channels: [
        CHANNEL_NAME
    ]
};

// Cria um cliente para a conexão com a twitch
const client = new tmi.client(opts);

// Manipuladores de eventos
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// chama função sh (Stream Hollics) ------------
client.on('join', (channel, username, self) => {
    try {
        sh.onJoin(username, client);
    } catch (err) {
        console.log('Erro ao acessar SH!');
    }
});

// Conecta o bot ao canal da twitch
client.connect();

function onMessageHandler(target, context, msg, self) {

    //para rodar ads automaticamente
    if (ad_start) {
        ad.RodarAd(30, 20);
        console.log('Iniciando ads automaticos');
        ad_start = false;
    }

    if (self) {
        return;
    }

    // limpa espaços vazios na mensagem
    const commandName = msg.trim();

    // Lê texto com o tts
    tts.LerTexto(commandName, context, client);

    // chama 'EasterEggs' --------------------------
    other.tabuada(target, msg, commandName, client);
    other.hello(target, msg, commandName, client);
    other.gato(target, msg, commandName, client);

    //chama funções básicas
    other.basicMsgs(target, msg, commandName, client);

    

}
// Chamado toda vez que o bot se conecta à twitch
function onConnectedHandler(addr, port) {
    try {
        console.log(`* Connected to ${addr}:${port}`);
        ad_start = true;
    } catch (error) {
        console.log("Erro ao conectar. ERRO:", error);
    }
}