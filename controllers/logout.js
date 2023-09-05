const logoutRouter = require('express').Router();
const User = require('../models/user');


// para leer el usuario y sacarlo de sesion 

logoutRouter.get('/', async (request, response) => {
    const cookies = request.cookies;

    if (!cookies?.accessToken) {
        return response.sendStatus(401);
    }

    response.clearCookie('accessToken', {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true
    });

    return response.sendStatus(200);

});



module.exports = logoutRouter;