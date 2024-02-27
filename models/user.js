const {Schema,model} = require('mongoose')

const UserSchema = Schema({
  name:{
    type:String,
    required:[true, 'Must have a name']
  },
  email:{
    type:String,
    required:[true, 'Must have an email'],
    unique:true,
  },
  password:{
    type:String,
    required:[true, 'Must have a password'],
  },
  img:{
    type:String,
  },
  role:{
    type:String,
    require:true,
    emun:['ADMIN_ROLE','USER_ROLE']
  },
  state:{
    type:Boolean,
    default:true,
  },
  google:{
    type:Boolean,
    default:false,
  },
})


UserSchema.methods.toJSON = function(){
  const {__v,password,_id,...user} = this.toObject();
  user.uid = _id;
  return user
}


module.exports = model('User',UserSchema);