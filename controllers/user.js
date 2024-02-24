const {response} = require('express')
const User = require('../models/user')


const usersGet = (req,res = response) =>{

  const query = req.query;

    res.json({
      msg: 'get API-controlador',
      query
    })
  
}

const usersPut = (req,res = response) =>{

  const id = req.params.id

  res.json({
    msg:'put API-controler',
    id
  })
}
const usersPost = async (req,res = response) =>{

  const body = req.body;
  const user = new User(body)
  await user.save();
  res.json({
    msg:'post API-controler',
    user
  })
}
const usersDelete = (req,res = response) =>{
  res.json({
    msg:'Delete API-controler'
  })
}


module.exports = {
  usersGet,
  usersDelete,
  usersPost,
  usersPut
}