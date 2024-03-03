const {Router} = require('express')
const {check} = require('express-validator')

const {validateField} = require('../middlewares/validateField')
const { loadFile, updateImg, showImg, updateImgCloudinary } = require('../controllers/uploads')
const { allowedCollections } = require('../helpers')
const { validateFile } = require('../middlewares/validateFile')

const router = Router()

router.post('/',[
  validateFile,
],loadFile)
router.put('/:collection/:id',[
  validateFile,
  check('id','Must be a Mongo Id').isMongoId(),
  check('collection').custom(c => allowedCollections(c,['users','products'])),
  validateField
],updateImgCloudinary)
// ],updateImg)

router.get('/:collection/:id',[
  check('id','Must be a Mongo Id').isMongoId(),
  check('collection').custom(c => allowedCollections(c,['users','products'])),
  validateField

],showImg)




module.exports = router;