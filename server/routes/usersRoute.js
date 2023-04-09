const router = require('express').Router();
const User = require('../models/User');
const userService = require('../services/userService');


// by id
router.get("/:id", async (req, res) => {
  try {
    const user = await userService.findById(req.params.id)
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
})


//Update
router.put("/:id", async (req, res) => {
  try {
    const updateName = await userService.update(req.params.id, req.body)
    res.status(200).json(updateName);
  } catch (err) {
    res.status(500).json(err);
  }
})

// last five
router.get('/', async (req, res) => {
    try {
      const lastFiveUsers = await userService.findLastFiveUsers();
      res.json(lastFiveUsers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  

module.exports = router;
