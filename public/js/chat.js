


let user = null;
let socket = null;

const txtUid = document.querySelector('#txtUid')
const txtMessage =document.querySelector('#txtMessage')
const ulUsers =document.querySelector('#ulUsers')
const ulMessages =document.querySelector('#ulMessages')
const btnExit =document.querySelector('#btnExit')

const validateJWT = async () => {
  const token = localStorage.getItem('token') || '';

  if(token.length <= 10){
    window.location = 'index.html'
    throw new Error('No token on server')
  }

  const resp = await fetch('http://localhost:8080/api/auth/',{
    headers:{'x-token':token}
  })

  const {user:userDB, token:tokenDB} = await resp.json()
  localStorage.setItem('token',tokenDB)
  user = userDB;
  document.title = user.name

  await connectSocket();


}

const connectSocket = async () => {

  socket = io({
    'extraHeaders':{
      'x-token':localStorage.getItem('token')
    }
  })

  socket.on('connect',() => {
    console.log('Sockets online')
  })
  socket.on('disconnect',() => {
    console.log('Sockets offline')
  })

  socket.on('message-rec', () => {

  })

  socket.on('active-users',() => {})

  socket.on('private-message',() => {})


}

const main = async() => {

  await validateJWT()

}

main()


