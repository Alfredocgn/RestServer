const Role = require('../models/role')
const User = require('../models/user')

const isValidRole = async (role = '') => {
  const existsRol = await Role.findOne({role});
  if(!existsRol){
    throw new Error(`The role ${role} does not exists`)
  }


}

const isValidEmail = async (email = '') => {

  const existEmail = await User.findOne({email})
  if(existEmail){
    throw new Error(`The email ${email} already exists`)
  }


} 
const userIdExist = async (id) => {

  const existUser = await User.findById(id)
  if(!existUser){
    throw new Error(`The id ${id} does not exist`)
  }


} 



module.exports = {
  isValidRole,
  isValidEmail,
  userIdExist
}