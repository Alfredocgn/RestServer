const { response } = require("express");
const {ObjectId} = require('mongoose').Types;
const {User,Category,Product} = require('../models')

const allowedCollections = [
  'users',
  'categories',
  'role',
  'products'
]

const searchUser = async(term = '',res=response) => {
  
  const isMongoID = ObjectId.isValid(term)

  if(isMongoID){
    const user = await User.findById(term)
    return res.json({
      results: user ? [user] : []
    })
  }

  const regexp = new RegExp (term,'i');

  const users = await User.find({
    $or: [{name:regexp},{email:regexp}],
    $and:[{state:true}]
  })
  res.json({results:users})
}

const searchCategories = async(term = '',res=response) => {

  const isMongoID = ObjectId.isValid(term)

  if(isMongoID){
    const category = await Category.findById(term)
    return res.json({
      results: category ? [category] : []
    })
  }

  const regexp = new RegExp(term,'i')

  const categories = await Category.find({name:regexp,state:true  })

  res.json({results:categories})

}
const searchProducts = async(term = '',res=response) => {

  const isMongoID = ObjectId.isValid(term)

  if(isMongoID){
    const product = await Product.findById(term)
    return res.json({
      results: product ? [product] : []
    })
  }

  const regexp = new RegExp(term,'i')

  const products = await Product.find({name:regexp,state:true})

  res.json({results:products})

}

const search = (req,res = response) => {

  const {collection,term} = req.params

  if (!allowedCollections.includes(collection)){
    return res.status(400).json({
      msg:`Allowed collections are: ${allowedCollections}`
    })

  }

  switch (collection){
    case 'users':
        searchUser(term,res)
      break
    case 'categories':
        searchCategories(term,res)
      break
    case 'products':
        searchProducts(term,res)
      break
    default:
      res.status(500).json({
        msg:'Not found'
      })
  }




}


module.exports = {
  search
}