const loginRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require ('bcrypt')
const jwt = require ('jsonwebtoken')

loginRouter.post ('/', async (request, response) => {
    
 const { email, password } = request.body
 const userExist = await User.findOne({email});

 // condicionales para verificar el usuario en el Login

 // cuando el usuario no existe 
 if (!userExist) {
    return response.status(400).json({error: 'invalid e-mail or password'});
 }

 // Cuando el email no esta verificado pero el usuario si existe 
 if (!userExist.verified) {
    return response.status(400).json({error: 'please verify your e-mail'});
 }

const isCorrect = await bcrypt.compare(password, userExist.passwordHash)

// Cuando la clave no es la correcta 
if (!isCorrect) {
    return response.status(400).json({error: 'invalid e-mail or password'});

}

const userForToken = {
    id: userExist.id,
}

const accessToken = jwt.sign(userForToken, process.env.ACCESS_TOKEN_SECRET, { 
    expiresIn: '1d',

});

response.cookie('accessToken', accessToken, {
    expires: new Date (Date.now() + 1000 * 60 * 60 * 1),
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true
})

return response.sendStatus(200);

});  


module.exports = loginRouter;
