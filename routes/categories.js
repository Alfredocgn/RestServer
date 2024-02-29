const {Router} = require('express')
const {check} = require('express-validator');
const { validateField } = require('../middlewares/validateField');
const { validateJWT } = require('../middlewares/validateJWT');
const { createCategory, getCategories, getCategory, updateCategory, deleteCategory } = require('../controllers/categories');
const { existCategoryById } = require('../helpers/dbValidators');
const { isAdminRole } = require('../middlewares/validateRole');

const router = Router()

//middleware personalizado para validar id check(id).custom(existCategory) si no existe categoria deberia tener error helper

//Obtener todas las categorias
router.get('/',getCategories)


//Obtener una categoria por id
router.get('/:id',[
  check('id','Not a mongo Id').isMongoId(),
  check('id').custom(existCategoryById),
  validateField,

],
getCategory)


//Crear una nueva categoria privado solo persona con token valido
router.post('/',[
  validateJWT,
  check('name','Name is required').not().isEmpty(),
  validateField

],createCategory)


//actualizar cualquier con token valido
router.put('/:id',[
  validateJWT,
  check('name','Name is required').not().isEmpty(),
  check('id').custom(existCategoryById),
  validateField
],updateCategory)


//Eliminar categoria
router.delete('/:id',[
  validateJWT,
  isAdminRole,
  check('id','Not a mongo Id').isMongoId(),
  check('id').custom(existCategoryById),
  validateField,

],deleteCategory)





module.exports = router;