const userModel = require('./../Models/userModel')
const JWT = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const handlerError = (err)=>{
    // console.log(err.message,err.code)
    let errors= {email: '', password:''};

if(err.message === 'incorrect Email'){
    errors.email = 'incorrect Email'
}
if(err.message === 'incorrect password'){
    errors.password = 'incorrect password'
}
    // duplicate error code
if(err.code=== 11000){
errors.email="duplicate email,";
return errors;
}


    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}
const maxAge =3*24*60*60;
const createToken = (id)=>{
    return JWT.sign({id},'foryou',{
        expiresIn: maxAge,
    });
}
const userLogin = async (email,password) =>{
    const user = await userModel.findOne({email});
    if(user){
const auth = await bcrypt.compare(password,user.password)
if(auth){
    return user;
}
throw Error('incorrect password');
    }
    throw Error('incorrect Email')
}
module.exports.singup_get = (req,res)=>{
    res.render('singup',{errors:false})
},
module.exports.singup_post = async (req,res)=>{
    // return res.send(req.body)
    const {email, password} = req.body;
  try{
const user = await userModel.create({email, password});
const token = createToken(user.id)
res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge *1000})
if(user) return res.redirect('/')
  }catch(e){
const errors = handlerError(e)
res.render('singup',{ errors, email, password })
  }
},
module.exports.login_get = (req,res)=>{
    res.render('login',{ errors:false})
},

module.exports.login_post = async (req,res)=>{
    const {email, password} = req.body;
try{
  const user = await userLogin(email, password);
  const token = createToken(user.id)
res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge *1000})
const userdata = await userModel.findOne({email});
res.render('home',{ user:userdata})
}catch(e){
    const errors =  handlerError(e)
    res.render('login',{errors:errors})
}
}
module.exports.logout_get = (req,res) => {
res.cookie('jwt','',{maxAge:1});
res.redirect('/');       
}