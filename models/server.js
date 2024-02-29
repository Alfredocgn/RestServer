const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

  constructor(){
    this.app = express()
    this.port = process.env.PORT;

    this.paths = {
      auth:'/api/auth',
      users:'/api/users',
      categories:'/api/categories'
    }

    // this.usersPath='/api/users';
    // this.authPath='/api/auth';

    //Connect to database
    this.connectDb()
    


    //Middlewares
    this.middlewares();




    //Routes
    this.routes()
  }

  async connectDb(){
    await dbConnection()
    
  }

  middlewares(){
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.static('public'))
  }

  routes(){
    this.app.use(this.paths.auth,require('../routes/auth'))
    this.app.use(this.paths.users,require('../routes/user'))
    this.app.use(this.paths.categories,require('../routes/categories'))

  }




  listen(){
    this.app.listen(this.port,() => {
      console.log('Server listening on port:',this.port)
    })
    
  }




}


module.exports = Server;