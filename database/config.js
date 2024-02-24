const mongoose = require('mongoose');


const dbConnection = async() =>{

  try {

    await mongoose.connect(process.env.MONGODB)

    console.log('Db online')

    
  } catch (error) {
    console.log(error)
    throw new Error('Error in db initialization')
    
  }


}

module.exports = {
  dbConnection,
}