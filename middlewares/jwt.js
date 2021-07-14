const jwt = require('jsonwebtoken')
//models
const UserModel = require("../models/user")
const db = require('../config/index').get(process.env.NODE_ENV);

module.exports = {
    encode: async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await UserModel.getUserById(userId);
        const payload = {
            userId: user._id,
            userType: user.type,
        };
        const authToken = jwt.sign(payload, SECRET_KEY);
        console.log('Auth', authToken)
        req.authToken = authToken;
        next();
    } catch (error) {
        return res.status(400).json({ success: false, message: error });
    }
},
 decode: async (req, res, next) => {
     var jwtToken = req.cookies.auth.match(/[^\s.]+/g)[0],
         token = req.cookies.auth;
     //console.log(db.SECRET)
    if (!token) {
        return res.status(400).json({ success: false, message: 'No access token provided' });
    }
    const accessToken = token;
    try {
        const decoded = jwt.verify(accessToken, db.SECRET);
        req.userId = decoded.userId;
        req.userType = decoded.type;
        return next();
    } catch (error) {
        //console.log(error)
        return res.status(401).json({ success: false, message: error });
    }
}}