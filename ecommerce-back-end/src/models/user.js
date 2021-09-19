const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
        firsName: {
            type:String,
            required: true,
            min: 3,
            max:20
        },
        middleName: {
            type:String,
            required: true,
            min: 3,
            max:20
        },
        lastName: {
            type:String,
            required: true,
            min: 3,
            max:20
        },
        username: {
            type:String,
            required: true,
            trim:true, //cut out the white spaces
            unique:true, //make it unique
            index: true, //seach for the username
            lowercase:true
        },
        email: {
            type:String,
            required:true,
            trim: true,
            unique: true,
            lowercase:true
        },
        hash_password : {
            type: String,
            required: true
        },
        role:{
            type:String,
            enum:['user','admin'],
            default: 'admin'
        },
        contactNumber: {
            type:String
        },
        profilePicture:{
            type:String
        }, timestamps:true
    });

    userSchema.virtual('password').set(function(password){
            //this.hash_password = 
    }); //virtuals- not stored in mongodb-ideal for computed properties
    //bcrypt ->

module.exports =mongoose.model('User',userSchema);