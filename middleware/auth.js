//fait appel à jsonwebtoken, notre protocole de tokenisation pour l'authentification
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    //prend le token de validation présent dans le header, le vérifie et récupère l'ID de l'utilisateur associé au token
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const userId = decodedToken.userId;
    
    //Vérifie que l'ID utilisateur récupéré est celui attendu (celui de l'utilisateur qui essaye d'accéder à la page) ; si non erreur, si oui passe au module suivant
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};
