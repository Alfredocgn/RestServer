const { Socket } = require('socket.io');
const { checkJWT } = require("../helpers/generateJWT")



const socketController = async (socket = new Socket() ) => {

  const user = await checkJWT(socket.handshake.headers['x-token'])
  if(!user){
    return socket.disconnect()
  }

  console.log('Connected',user.name)

  

}

module.exports = {
  socketController
}