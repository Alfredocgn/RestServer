const {Router} = require('express')
const {check} = require('express-validator')
const { usersGet, usersPut, usersPost, usersDelete } = require('../controllers/user')
const { validateField } = require('../middlewares/validateField')
const { isValidRole, isValidEmail, userIdExist } = require('../helpers/dbValidators')



const router = Router()


router.get('/',usersGet)
router.put('/:id',[
  check('id','Unvalid id').isMongoId(),
  check('id').custom(userIdExist),
  check('role').custom(isValidRole),
  validateField
],usersPut)
router.post('/',[
  check('name', 'name cant be empty').not().isEmpty(),
  check('email', 'invalid email').isEmail(),
  check('email').custom(isValidEmail),
  check('password', 'Password must be at least 6 characters').isLength({min:6}),
  check('role').custom(isValidRole),
  // check('role', 'Not a valid role').isIn(['ADMIN_ROLE','USER_ROLE']),

  validateField
],usersPost)
router.delete('/:id',[
check('id','Unvalid id').isMongoId(),
check('id').custom(userIdExist),
validateField],
usersDelete)



module.exports = router;