//appel des packages nécessaires au code Express = framework utilisé, mongoose = BDD
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

//paramétrages de base
const app = express();
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');
const path = require('path');

//Connexion à la bdd mongo. Les informations de connexion sont stockées dans le dotenv
mongoose.connect(`mongodb+srv://${process.env.MongoUser}:${process.env.MongoPass}@cluster0.dwfbx.mongodb.net/cluster0?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//Paramétrages des headers de requêtes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json())

//Connexion des routes et du middleware image
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

app.use((req, res, next) => {
    console.log('Le server est lancé !');
})

//export de l'app
module.exports = app;
