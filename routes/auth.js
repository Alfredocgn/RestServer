const {Router} = require('express')
const {check} = require('express-validator');
const { login } = require('../controllers/auth');
const { validateField } = require('../middlewares/validateField');



const router = Router()


router.post('/login',[
  check('email','Email required').isEmail(),
  check('password','Password required').not().isEmpty(),
  validateField
],login)


  module.exports = router;