const {response} = require('express')
const User = require('../models/user')
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generateJWT');

const login = async (req,res = response) => {

  const {email,password} = req.body;

  try {

    //Verify if email exist
    const user = await User.findOne({email})
    if(!user){
      return res.status(400).json({
        msg:'User/ Password incorrect - email'
      })
    }



    //Verify if user is active

    if(user.status){
      return res.status(400).json({
        msg:'User/password incorrect - state:false'

      })
    
    }

    //Verify password

    const validPassword = bcryptjs.compareSync(password,user.password)
    if(!validPassword){
      return res.status(400).json({
        msg:'User/password incorrec - password'
      })
    }

    //Generate JWT

    const token = await generateJWT(user.id)



    res.json({
      user,
      token
    })
    
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      msg:'Something went wrong'
    })
    
  }





}

module.exports = {
  login
};