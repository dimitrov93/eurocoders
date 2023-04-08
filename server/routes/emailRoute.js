const router = require('express').Router();
const Email = require('../models/Email');
const emailService = require('../services/emailService');


router.post('/', async (req,res) => {
    const { name, email, message } = req.body;

    try {
        const emailResponse = await emailService.create(name,email,message)
        res.status(201).json(emailResponse)
    } catch (err) {
        res.status(500).json(err)
        console.log(err);
    }
});

module.exports = router;
