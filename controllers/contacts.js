const contactsRouter = require('express').Router();
const User = require ('../models/user');    
const Contact = require ('../models/contact');

const name_regexr=/^[A-Z]{1}[a-z]{0,15} [A-Z]{1}[a-z]{0,11}$/
const phone_regexr=/^[0](412|414|416|426|424|212)[0-9]{7}$/

contactsRouter.get('/', async (request, response) => {

    const user = request.user;
    const contacts = await Contact.find({user: user.id})
    return response.status(200).json(contacts);
  });

  contactsRouter.post('/', async (request, response) => {

    const user = request.user;
      const {name, phone} = request.body;

      if (!name_regexr.test(name) || !phone_regexr.test(phone)){
        return response.status(400).json({error:"To add a new contact you should follow the requirements"})
      };

      const newContact = new Contact ({
        name,
        phone,
        user: user._id
      });

      const savedContact = await newContact.save();
  
      user.contacts = user.contacts.concat(savedContact._id);
      await user.save();
      
      return response.status(200).json(savedContact)


});

contactsRouter.delete('/:id', async (request, response) => {

  const user = request.user;

  await Contact.findByIdAndDelete(request.params.id);

  user.contacts = user.contacts.filter(id => id.toString() !== request.params.id)

  await user.save()
  return response.sendStatus(204);

});

contactsRouter.patch('/:id', async (request, response) => {

  const user = request.user;
  
  const {name,phone} = request.body;

  if (!name_regexr.test(name) || !phone_regexr.test(phone)){
    return response.status(400).json({error:"To edit and save you should follow the requirements"})
  };

  await Contact.findByIdAndUpdate(request.params.id, { name,phone })

  return response.sendStatus(200);
 

});
 

module.exports = contactsRouter;