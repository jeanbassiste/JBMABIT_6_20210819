const Sauce = require('../models/Sauces');
const fs = require('fs');

exports.getAllSauce = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({error}));

};

exports.getSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({error}));
};

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        userLiked: [],
        userDisliked: [],
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce ajoutée !'}))
        .catch( error => res.status(400).json({error}));
};

exports.updateSauce = (req, res, next) => {
    const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            
        } : {...req.body};
        Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
        .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
        .catch(error => res.status(400).json({error}));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images')[1];
            fs.unlink(`images/${filename}`, ()=> {
                Sauce.deleteOne({_id: req.params.id})
                .then(() => res.status(200).json({message: 'Sauce supprimée !'}))
                .catch(erro => res.status(400).json({error}));
            });
        })
        .catch(error => res.status(500).json({error}));
};

exports.likeSauce = (req, res, next) => {
    const likeLevel = req.body.like;
    if(likeLevel == 1){
        Sauce.updateOne(
            { _id: req.params.id },
            { $push: { usersLiked: req.body.userId }, $inc: { likes: +1 } })
            .then(() => res.status(200).json({message: 'like Ok'}))
            .catch( (error) => console.log(error))
    }

    if(likeLevel == -1){
        Sauce.updateOne(
            { _id: req.params.id },
            { $push: { usersDisliked: req.body.userId }, $inc: { dislikes: +1 } })
            .then(() => res.status(200).json({message: 'dislike Ok'}))
            .catch( (error) => console.log(error))
    }

    if(likeLevel == 0){
        const sauce = Sauce.findOne({_id: req.params.id})
        .then((sauce) => {
            if(sauce.usersLiked.includes(req.body.userId)){
                console.log('L utilisateur aime déjà la sauce');
                Sauce.updateOne(
                    { _id: req.params.id },
                    { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } })
                    .then(() => res.status(200).json({message: 'like enlevé'}))
                    .catch( (error) => console.log(error))
            }
            else if(sauce.usersDisliked.includes(req.body.userId)){
                console.log('L utilisateur n aime pas la sauce');
                Sauce.updateOne(
                    { _id: req.params.id },
                    { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 } })
                    .then(() => res.status(200).json({message: 'dislike enlevé'}))
                    .catch( (error) => console.log(error))
            }
        })
        .catch((error) => console.log(error))
    }

    console.log(req.body.userId);
    Sauce.findOne({_id: req.params.id})
    .then((sauce) => console.log(sauce.userLiked))
    .catch( (error) => console.log(error))
}