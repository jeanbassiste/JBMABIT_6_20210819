//Créé le modèle de données pour les utilisateurs : détermine chaque valeur, son type et s'il est ou non obligatoire, puis l'exporte 

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true}
});

//Ajout du plugin de validation afin de permettre la vérification que l'email de chaque utilisateur est unique
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
