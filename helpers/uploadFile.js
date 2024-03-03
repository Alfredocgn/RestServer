const path = require('path')
const {v4:uuidv4} = require('uuid')

const uploadFile = (files,validExtension = ['png','jpg','jpeg','gif'],folder = '') =>{

  return new Promise((resolve,reject) => {

    try {
      const {file} = files;
      const splitName = file.name.split('.')
      const extension = splitName[splitName.length - 1]
    
      if(!validExtension.includes(extension)){
        return reject(`The extension ${extension} is not allowed ${validExtension}`)
  
      }
    
    
    
      const tempName = uuidv4() + '.'+ extension;
      const uploadPath = path.join(__dirname, '..', 'uploads',folder, tempName)
    
      file.mv(uploadPath, function(err) {
        if (err)
          reject(err)
    
        resolve(tempName);
      });
      
    } catch (error) {
      reject(error)
      
    }



  })

}


module.exports = {
  uploadFile
}