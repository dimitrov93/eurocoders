const router = require('express').Router();
const pictureService = require('../services/pictureService')

// All
router.get('/', async (req, res) => {
  try {
    const pictures = await pictureService.getAll();
    res.status(200).json(pictures);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server Error'});
  }
});

// By id
router.get('/:id', async (req, res) => {
  try {
    const picture = await pictureService.getById(req.params.id);
    console.log(picture);
    res.status(200).json(picture);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server Error'});
  }
});

router.get('/pics', async (req, res) => {
  try {
    const pictures = await pictureService.getAllPicturesPerUser();
    res.status(200).json(pictures);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server Error'});
  }
});

router.post('/', async (req, res) => {
  try {
    const picture = await pictureService.create(req.body.userId, req.body.imgUrl)
    res.json({ picture })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Error creating picture' })
  }
})

router.delete('/:pictureId', async (req, res) => {
  try {
    await pictureService.delete(req.params.pictureId, req.body.userId)
    res.json({ message: 'Picture deleted' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Error deleting picture' })
  }
})


module.exports = router
