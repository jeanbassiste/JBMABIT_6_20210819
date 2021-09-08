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
    const sauceToUpdate = Sauce.findOne({_id: req.params.id})
    console.log('jusquici tout va bien. ' + 'Nombre de likes : ' + sauceToUpdate.likes + 'Nombre de dislikes : ' + sauceToUpdate.dislikes);
    const likeLevel = req.body.like;
    console.log(likeLevel);
    
    if(likeLeve=1){
        sauceToUpdate.likes +=1;
        console.log('Liked!')
    }
    else if (likeLevel=-1){
        console.log('Disliked.');
    }
    else if(likeLevel=0){
        console.log('On verra ça plus tard...')
    }
    //if()
        /*.then((req) => {
            if (req.body.like=1){
                sauce.like += 1;
                sauce.usersLiked += req.body.userId;
                console.log('Liked!')
            }
            else if (req.body.like=-1){
                sauce.dislike +=1;
                sauce.usersDisliked += req.body.userId;
                console.log('Disliked!')
            }
            else if(req.body.like=0){
                console.log('On verra ça plus tard...')
            }
        })
        .catch(error => res.status(400).json({error}))*/
};