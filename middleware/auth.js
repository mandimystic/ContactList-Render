const jwt = require ('jsonwebtoken');
const User = require('../models/user');

const userExtractor = async (request, response, next ) => {
    console.log('hola');
    

    try {
        const token = request.cookies?.accessToken;

    if (!token) { 
        return response.sendStatus(401);
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.id);

    request.user = user;

    console.log(decoded);

    } catch (error) {
        console.log(error);
        return response.sendStatus(403);
    }

next();

}; 

module.exports = {userExtractor};