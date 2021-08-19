const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = requipe('jsonwebtoken');

exports.signup = (req, res, next) => {
    bcrypt.hash(re.body.password, 10)
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
                res.status(400).json({
                    error: error
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
                token: jwt.signup(
                    { userId: user._id },
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h'}
                )
            });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};