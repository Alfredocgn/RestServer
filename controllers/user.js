const {response} = require('express')
const bcryptjs = require('bcryptjs')
const User = require('../models/user');



const usersGet = async (req,res = response) =>{

  const {lim = 5,start = 0} = req.query;
  const query = {state:true}

  // const users = await User.find(query).skip(Number(start)).limit(Number(lim))
  // const total = await User.countDocuments(query)
  const [total,users] = await Promise.all([User.countDocuments(query),User.find(query).skip(Number(start)).limit(Number(lim))])

    res.json({
      total,
      users

    })
  
}
const usersPost = async (req,res = response) =>{



  const {name,email,password,role} = req.body;
  const user = new User({name,email,password,role})




  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password,salt)




  await user.save();
  res.json({
    msg:'post API-controler',
    user
  })
}

const usersPut = async (req,res = response) =>{

  const {id} = req.params;
  const {_id,password,google,email, ...info} =req.body;

  if(password){

    const salt = bcryptjs.genSaltSync();
    info.password = bcryptjs.hashSync(password,salt)
    

  }

  const user = await User.findByIdAndUpdate(id,info)




  res.json(user)
}

const usersDelete = async  (req,res = response) =>{
  const {id} = req.params;
  const uid = req.uid;

  //BORRADO FISICO
  // const user = await User.findByIdAndDelete(id);

  const user = await User.findByIdAndUpdate(id,{state:false})


  res.json(
    {user}
  )
}


module.exports = {
  usersGet,
  usersDelete,
  usersPost,
  usersPut
}