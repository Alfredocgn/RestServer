const jwt = require('jsonwebtoken')
const {response} = require('express')
const User = require('../models/user')

const validateJWT = async (req,res = response,next) => {

  const token = req.header('x-token');
  if(!token){
    return res.status(401).json({
      msg:'No token send'
    })
  }
    try {
      
      const {uid} = jwt.verify(token,process.env.SECRETORPRIVATEKEY);




      //Leer que el usuario corresponde al uid
      const user = await User.findById(uid)


      if(!user){
        return res.status(401).json({
          msg:'Unvalid Token - user deleted from DB'
        })
      }



      //verificar si el uid tiene state true
      if(!user.state){
        return res.status(401).json({
          msg:'Unvalid token - user state false'
        })
      }
      req.user = user;




      next()
      
    } catch (error) {
      console.log(error)
      res.status(401).json({
        msg:'Unvalid token'
      })
      
    }
  



}

module.exports ={
  validateJWT
}