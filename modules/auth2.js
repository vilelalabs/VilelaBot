
function getAuth(_from) {
    let auth = '';

    switch (_from) {
        case 'twitch':                  // define o nome da autenticação que será utilizada
            auth = 'TWITCH_OAUTH';      // código da chave de autenticação em si
            break;
        case 'anotherAPI':              // define o nome da autenticação que será utilizada
            auth = 'ANOTHER_API_OAUTH'; // código da chave de autenticação em si
            break;

        /* crie mais 'cases' para outras APIs aqui */

        default:
            break;
    }

    return auth;
}

module.exports = { getAuth };