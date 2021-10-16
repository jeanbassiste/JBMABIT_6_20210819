const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
                console.log(Object.getOwnPropertyNames(error.errors));
                var message = [];
                console.log(error.errors.email.properties.message);
                Object.getOwnPropertyNames(error.errors).forEach(function (element) {
                    console.log(element);
                    var err = error.errors.email.properties.message;
                    message += err;
                });
                res.status(400).json({
                    message: message
                });
            }
        );
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    console.log(process.env.TOKEN);
    User.findOne({ email: req.body.email })
    .then(user => {
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur inexistant'});            
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if(!valid) {
                return res.status(400).json({ message: 'Mot de passe incorect'});
                
            }
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    { userId: user._id },
                    process.env.TOKEN,
                    { expiresIn: '24h'}
                )
            });
        })
        .catch(error => res.status(500).json({ message: user }));
        console.log('did not work');
    })
    .catch(error => res.status(500).json({ error }));
};