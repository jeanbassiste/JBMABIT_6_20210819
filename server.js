//Connexion avec les modules nécessaires au fonctionnement
const http = require('http');
const app = require('./app');
require('dotenv').config();
 
//Vérification du port : prend le port fixé et vérifié sa validité
const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

//Définit le port de connexion : soit une variable contenue dans process.env, soit par défaut 3000 et la passe dans la fonction précédente
const port = normalizePort(process.env.PORT || '3000');

//Connect l'app sur le bon port
app.set('port', port);

//S'il y a une erreur avec l'adresse de connexion, renvoi un message personnalisé selon l'erreur
const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const server = http.createServer(app);

//Allume le serveur, s'il y a une erreur, lance la fonction précédente ; si non lance le serveur et renvoi un message de validation
server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    console.log('Listening on ' + bind);
});

//Indique à notre serveur le port d'écoute
server.listen(port); 
