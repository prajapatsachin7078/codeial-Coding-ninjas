const express = require('express');
// const app = express();
const router = express.Router();

const homeController = require('../controllers/home_controller');
// handling hom route 
router.get('/', homeController.home);
// any other routes should be handled here
router.use('/users',require('./users'));

router.use('/posts', require('./posts'));

router.use('/comments', require('./comments'));
// console.log('router starting')

module.exports = router;

