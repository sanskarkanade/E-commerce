const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//token generation
const generateToken = (id)=>{
   return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn : process.env.JWT_EXPIRES_IN});   
}


//post /api/user/register
exports.registerUser = async(req ,res) =>{
    try {
        const {username ,email ,password ,isAdmin} = req.body;
        const search = await User.findOne({email});
        if(search) return res.status(400).json({message:"User already exists"});

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password,salt);

        const user = await User.create({
            username ,email ,isAdmin, password:hash
        });

        res.status(200).json({
            message:"User registerd",
            token:generateToken(user._id),
            user:{id:user._id ,username:user.username ,email:user.email ,isAdmin:user.isAdmin}
        });
    } catch (error) {
        res.status(500).json({message:"Registeration failed",error});
    }
};

// post /api/user/login
exports.loginUser = async(req ,res) =>{
    try {
          const {email ,password} = req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message:"Invalid Credentials"});

        const match = await bcrypt.compare(password, user.password);
        if(!match) return res.status(400).json({message:"Invalid Credentials"});

        res.status(200).json({
            message:"User logged in",
            token:generateToken(user._id),
            user:{id:user._id ,username:user.username ,email:user.email ,isAdmin:user.isAdmin}
        });
    } catch (error) {
        res.status(500).json({message:"Login failed",error});
    }
};

// put /api/user/profile
exports.updateUserProfile = async(req ,res) =>{
    try {
        const {username ,email} = req.body;
        const user = req.user;

        if(username) user.username = username;
        if(email) user.email = email;
        await user.save();
        res.status(200).json({message:"Profile updated",user});

    } catch (error) {
        res.status(500).json({message:"update failed",error});
    }
};