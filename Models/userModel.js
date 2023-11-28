const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');
const Schema = new mongoose.Schema({
email: {
type: String,
required: [true,"plase enter an email address"],
unique: [true,"must be unique"],
lowercase:true,
validate:[isEmail,"must be a valid email"]
},
password:{
type:String,
required:[true, "please enter a password"],
minlength:[6,"minimum password length is 7"],
}
});

Schema.pre('save',async function(next){
const salt = await bcrypt.genSalt();
this.password= await bcrypt.hash(this.password,salt)
    next();
});
const User = mongoose.model('user',Schema);
module.exports = User;
