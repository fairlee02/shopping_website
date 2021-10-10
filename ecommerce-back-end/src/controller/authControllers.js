const User = require('../models/User');
const jwt = require('jsonwebtoken'); //token algorithm for privatekey for verification SYNTAX: .sign     ('example:username',''verification' -secret key)




exports.signup = (req,res) => {

    User.findOne({email: req.body.email}).exec((error,user)=> {
        if(user) return res.status(400).json({
            message: 'User already registered'
        });

        //destructuring the body for new user
        const {
            firstName,
            middleName,
            lastName,
            email,
            password

        } = req.body;
        const _user = new User({
            firstName,
            middleName,
            lastName,
            email,
            password,
            username: Math.random().toString()
        });

        _user.save((error, data) =>{
            if(error){
                return res.status(400).json({
                    message: 'Something went wrong'
                });
            }

            if(data){
                //201-created success
                return res.status(201).json({
                    message:'User created successfully'
                })
            }
        })
    });
};

exports.signin = (req,res) =>{
    User.findOne({email: req.body.email}).exec((error,user) => {
        if(error) return res.status(400).json({error});
        if(user) {

            if(user.authenticate(req.body.password)) {
                const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '3h'});
                const { _id ,firstName,middleName,lastName,email,role, fullName} = user; //destructor data
                res.status(200).json({
                    token, 
                    user : {
                        _id ,firstName,middleName,lastName,email,role, fullName
                    }
                })
            
            } else {
                return res.status(400).json({
                    message: 'invalid Password'
                })
            }

        } else {
            return res.status(400).json({message: 'Something went wrong'})
        }
    });
};



