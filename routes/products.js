const {Router} = require('express')
const {check} = require('express-validator');
const { getProducts, createProduct, updateProduct, deleteProduct, getProduct } = require('../controllers/products')
const { existProductById, existCategoryById } = require('../helpers/dbValidators')
const { validateField } = require('../middlewares/validateField')
const { validateJWT } = require('../middlewares/validateJWT')
const { isAdminRole } = require('../middlewares/validateRole')


const router = Router()

router.get('/',getProducts)


router.get('/:id',[
  check('id','Not a Mongo Id').isMongoId(),
  check('id').custom(existProductById),
  validateField
],getProduct)


router.post('/',[
  validateJWT,
  check('name','Name is required').not().isEmpty(),
  check('category','Not a mongo Id').isMongoId(),
  check('category').custom(existCategoryById),
  validateField
],createProduct)


router.put('/:id',[
  validateJWT,
  // check('id','Not a Mongo Id').isMongoId(),
  check('id').custom(existProductById),
  validateField,
  
],updateProduct)


router.delete('/:id',[
  validateJWT,
  isAdminRole,
  check('id','Not a mongo Id').isMongoId(),
  check('id').custom(existProductById),
  validateField,
],deleteProduct)


module.exports = router;