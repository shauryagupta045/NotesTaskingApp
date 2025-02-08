// faltu

const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next ) =>{
    const auth = req.header['authorization'];
    if(!auth) return res.status(401).json({message : 'unauthorized , JWT token is require '});
    try{
        const decoded = jwt.verify(auth, process.env.SECRET_KEY);
        req.user = decoded;
        next();
        }catch(err){
            return res.status(401).json({message : 'invalid JWT token '});
            }
            }


module.exports= ensureAuthenticated;