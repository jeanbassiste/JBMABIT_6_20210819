const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require('dotenv');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        })
        user.save().then(
            () => {
                res.status(201).json({
                    message: 'Utilisateur créé'
                });
            }
        ).catch(
            (error) => {
                //find sur la propriété des objets ? Trouver comment afficher l'erreur, quelle qu'elle soit
                //console.log(Object.getOwnPropertyNames(error.errors));
                console.log(error.errors.email);
                console.log(Object.getOwnPropertyNames(error.errors));
                var message = "" ;
                Object.getOwnPropertyNames(error.errors).forEach(function (element) {
                    console.log(element);
                    //message += value;
                });
                //console.log(message);
                res.status(400).json({
                    //message: error.errors.email.properties.message
                    message: message
                });
            }
        );
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur inexistant'});
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if(!valid) {
                return res.status(401).json({ error : 'Mot de passe incorect'});
            }
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    { userId: user._id },
                    'RANDOM_TOKEN_SECRET', //faire un process.env('token') + dotenv
                    { expiresIn: '24h'}
                )
            });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};