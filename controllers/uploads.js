const {uploadFile} = require('../helpers')
const path = require('path')
const fs = require('fs')

const { response } = require("express");
const {User,Product} = require('../models')

const loadFile = async (req,res = response) => {


  // if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
  //   return res.status(400).json({msg:'No files were uploaded.'});
  // }

  

  try {
    const completePath = await uploadFile(req.files,undefined,'imgs')
    // const completePath = await uploadFile(req.files,['txt','md'],'newFolder')

    res.json({
      name:completePath
    })
    
  } catch (error) {
    res.status(400).json({error})
    
  } 
}

const updateImg = async (req,res =response) => {

  const {id,collection} = req.params;

  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if(!model){
        return res.status(400).json({
          msg:`The user with the id ${id} does not exist`
        })
      }
      
      break;

    case 'products':
      model = await Product.findById(id);
      if(!model){
        return res.status(400).json({
          msg:`The product with the id ${id} does not exist`
        })
      }
      
      break;
  
    default:
      return res.status(500).json({msg:'Is not validated'})
  }

  try {

    if(model.img){
      const pathImg = path.join(__dirname, '..', 'uploads',collection,model.img)
      if(fs.existsSync(pathImg)){
        fs.unlinkSync(pathImg)
      }
    }
    
  } catch (error) {
    console.log(error)
    
  }


  const completePath = await uploadFile(req.files,undefined,collection)
  model.img = completePath

  await model.save()

  res.json(model)

}

const showImg = async (req,res = response) =>{

  const {id,collection} = req.params;

  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if(!model){
        return res.status(400).json({
          msg:`The user with the id ${id} does not exist`
        })
      }
      
      break;

    case 'products':
      model = await Product.findById(id);
      if(!model){
        return res.status(400).json({
          msg:`The product with the id ${id} does not exist`
        })
      }
      
      break;
  
    default:
      return res.status(500).json({msg:'Is not validated'})
  }

  try {

    if(model.img){
      const pathImg = path.join(__dirname, '..', 'uploads',collection,model.img)
      if(fs.existsSync(pathImg)){
        return res.sendFile(pathImg)
      }
    }
    
  } catch (error) {
    console.log(error)
    
  }
  const missingImgPath = path.join(__dirname, '..', 'assets','no-image.jpg')
  res.sendFile(missingImgPath)

}

module.exports = {
  loadFile,
  updateImg,
  showImg
}