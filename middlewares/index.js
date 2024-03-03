

const validateFile = require('./validateFile')
const validateField = require('./validateField')
const validateJWT = require('./validateJWT')
const validateRole = require('./validateRole')


module.exports = {
  validateField,
  validateFile,
  validateJWT,
  validateRole
}