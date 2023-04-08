const Email = require('../models/Email');


exports.create = (name, email, message) => Email.create({name, email, message});
