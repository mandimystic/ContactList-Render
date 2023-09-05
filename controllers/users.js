const usersRouter = require ('express').Router();
const User = require('../models/user'); // Schema de mongodb 
const bcrypt = require('bcrypt'); // para encriptar contraseña
const jwt = require ('jsonwebtoken'); // para crear el token (id)
const nodemailer = require ('nodemailer'); // para enviar emails
const { PAGE_URL } = require ('../config.js');


usersRouter.post('/', async (request, response) => {
const { name, email, password } = request.body;

if (!name || !email || !password) {
    return response.status(400).json({ error: 'All spaces are required' });
} 

const userExist = await User.findOne({email})

if (userExist) {
    return response.status(400).json({ error: 'User already exists' });
}
const saltRounds = 10

const passwordHash = await bcrypt.hash(password, saltRounds);

newUser = new User ({
    name,
    email,
    passwordHash,
});

const savedUser = await newUser.save();

const token = jwt.sign({ id: savedUser.id}, process.env.ACCESS_TOKEN_SECRET,{
    expiresIn: '1d' 
});

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

await transporter.sendMail({
    from: process.env.EMAIL_USER,// sender address
    to: savedUser.email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `<a href="${PAGE_URL}/verify/${savedUser.id}/${token}">Verificar correo</a>`, // html body
  });

return response.status(201).json('User created, please confirm your email');

});

// Para traer al backend el token y verificar la cuenta

usersRouter.patch('/:id/:token', async (request, response) => {

  try {
    //verificando token
    const token = request.params.token;
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    const id = decodedToken.id;
    await User.findByIdAndUpdate(id, { verified: true })
    return response.sendStatus(200);

    // token expirado
  } catch (error) {

    const id = request.params.id;
    const {email} = await User.findById (id);
    const token = jwt.sign({ id: id}, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1d' 

 });
  
   const transporter = nodemailer.createTransport({

       host: "smtp.gmail.com",
       port: 465,
       secure: true,
       auth: {

    // TODO: replace `user` and `pass` values from <https:forwardemail.net>

         user: process.env.EMAIL_USER,
         pass: process.env.EMAIL_PASS,

       },
     });
  
   await transporter.sendMail({
       from: process.env.EMAIL_USER, //sender address,
       to: email, // list of receivers,
       subject: "Hello ✔", // Subject line,
       text: "Hello world?", // plain text body,
       html: `<a href="${PAGE_URL}/verify/${id}/${token}">Verificar correo</a>`, // html body
     });

   return response.status(400).json ({error: 'Link expired, we sent a new one. Check your email!'});

    console.log(error);

  }

  });

module.exports= usersRouter;