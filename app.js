require ('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const usersRouter = require("./controllers/users");
const loginRouter = require('./controllers/login');
const logoutRouter = require("./controllers/logout");
const contactsRouter = require("./controllers/contacts");
const cookieParser = require ('cookie-parser');
const cors = require ('cors');
const morgan = require ('morgan');
const { userExtractor } = require('./middleware/auth');
const { MONGO_URI } = require("./config");


(async () => {
try {
    await mongoose.connect(process.env.MONGO_URI_TEST);
    console.log('Conectado a MongoDB');
} catch (error) {
    console.log(error);
}
})();

// Frontend routers

app.use(cors())
app.use(cookieParser());
app.use(express.json());

app.use('/', express.static(path.resolve('views', 'home')));
app.use('/login', express.static(path.resolve('views', 'login')));
app.use('/contacts', express.static(path.resolve('views', 'contacts')));
app.use('/signup', express.static(path.resolve('views', 'signup')));
app.use('/styles', express.static(path.resolve('views', 'styles')));
app.use('/verify/:id/:token', express.static(path.resolve('views', 'verify')))
app.use('/img', express.static(path.resolve('img')))
app.use('/components', express.static(path.resolve('views', 'components')));

// Backend routers

app.use(morgan('tiny'));

app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/contacts', userExtractor, contactsRouter);


module.exports = app;