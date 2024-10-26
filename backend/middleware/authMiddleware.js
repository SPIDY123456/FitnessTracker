const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async(req,res,next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
        token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        if (!req.user){
            res.status(404).json({message : "User not Found"})
        }
        next();
    }
    catch(error){
        console.error("Error",error);
        res.status(401).json({mesage: 'No authorization token failed'});
    }
    if (!token){
        res.status(401).json({message: 'No authorization No token'});
    }
    }
}

module.exports = {protect}