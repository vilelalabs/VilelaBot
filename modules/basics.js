
exports.basicMsgs = basicMsgs;

// funções básicas do bot --------------------------------------------------------------------

function basicMsgs(target, mensagem, comando, client) {

    comando = comando.toLowerCase();

    const allCommands = [
        [
            aliases = ["prime", "pr", "pm"],
            resposta = '1. Acesse https://gaming.amazon.com |-| 2. Faca login na sua conta da amazon.com.br |-| 3. Selecione vincular conta da Twitch |-| 4. Faca login na sua conta da Twitch e selecione Confirmar. |-| 5. aqui no canal VilelaLabs, clique em Inscrever-se!'
        ],
        [
            aliases = ["comandos", "cmds", "comandos", "cmd"],
            resposta = `Command list:  (use after !) uptime, watchtime, top, donation, mesetas, pix, socials, site, prime, tts, and there are easter egg commands!`
        ],
        [
            aliases = ["hub"],
            resposta = `https://discord.gg/ahubtech`

        ],
        [
            aliases = ["brstreamers"],
            resposta = `https://brstreamers.dev/`

        ],

        //add new basic messages (just Question and Answer) ...
    ];

    for (let i = 0; i < allCommands.length; i++) {
        for (let j = 0; j < allCommands[i][0].length; j++) {
            if (comando === `!${allCommands[i][0][j]}`) {
                client.say(target, allCommands[i][1]);
                return;
            }
        }
    }
}

