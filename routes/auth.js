const {Router} = require('express')
const {check} = require('express-validator');
const { login, googleSignIn, renewToken } = require('../controllers/auth');
const { validateField } = require('../middlewares/validateField');
const { validateJWT } = require('../middlewares/validateJWT');



const router = Router()


router.post('/login',[
  check('email','Email required').isEmail(),
  check('password','Password required').not().isEmpty(),
  validateField
],login)


router.post('/google',[
  check('id_token','Google Token needed').not().isEmpty(),
  validateField
],googleSignIn)

router.get('/', validateJWT,renewToken )

  module.exports = router;