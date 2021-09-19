const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const timestamps = require('mongoose-timestamp');


const userSchema = new mongoose.Schema({
    firstName: {
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
            index: true, //search for the username
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
            default: 'user'
        },
        contactNumber: {
            type:String
        },
        profilePicture:{
            type:String
        },
        
    }, {
        timestamps: true
    });
    
    
    userSchema.virtual('password').set(function(password){
        this.hash_password = bcrypt.hashSync(password, 10)
    }); 
    //virtuals- not stored in mongodb-ideal for computed properties

    userSchema.virtual('fullName').get(function(){
        return `${this.firstName} ${this.lastName}`;
    }); //to get the fullname in a virtual variable
    
    userSchema.methods = {
        authenticate: function(password) {
            return bcrypt.compareSync(password, this.hash_password)
        }
    };
    
    //bcrypt -> hashing passwpord for security
    

    module.exports = mongoose.model('User',userSchema);