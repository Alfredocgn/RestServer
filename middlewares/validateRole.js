const { response } = require("express")



const isAdminRole = (req,res = response,next) => {
  

  if(!req.user){
    return res.status(500).json({
      msg:'Token without validation'
    })
  }

  const {role,name} = req.user;

  if(role !== 'ADMIN_ROLE'){
    return res.status(401).json({
      msg:`${name} is not admin he is not allowed to do that`
    })
  }





  next()


}

const hasRole = (...roles) =>{

  return(req,res = response,next) => {

    if(!req.user){
      return res.status(500).json({
        msg:'Token without validation'
      })
    }


    if(!roles.includes(req.user.role)){
      return res.status(401).json({
        msg : `Must be one of this roles ${roles}`
      })

    }

    next()

  }

}

module.exports ={
  isAdminRole,
  hasRole
}