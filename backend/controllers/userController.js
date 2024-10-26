const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Activity = require('../models/Activity');
const Goal = require('../models/Goal');

const generatetoken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '60d' });
}


const registerUser =  asyncHandler(async(req,res)=> {
    const {name, email, password,birthday,gender,weight,height,passion, profilePicture} = req.body;

    try {
        const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }
}
catch(error){
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
}

const hashedPassword =  await bcrypt.hash(password,14)

const user = await User.create({name,email,password:hashedPassword,birthday,gender,weight,height,passion,profilePicture});

if(user) {
     res.status(201).json({id : user._id, name: user.name, email: user.email, birthday: user.birthday, gender: user.gender, weight: user.weight, height:user.height, passion : user.passion, profilePicture: user.profilePicture,token: generatetoken(user._id), 
  })
}
  else {
    res.status(400).json({message : "Invalid user data"})

  }

})

const loginUser =  asyncHandler(async(req,res)=> {
    const { email, password } = req.body;
    try{

     const user = await User.findOne({email})

    if (user && (await bcrypt.compare(password,user.password))){
        res.json({
            id:user._id,
            name: user.name,
            email: user.email,
            birthday:user.birthday,
            gender:user.gender,
            weight:user.weight,
            height: user.height,
            passion: user.passion,
            profilePicture: user.profilePicture,
            token: generatetoken(user._id),
        })
    }
    else {
        res.json(400).json({message : "Invalid email and passsword"})
    }
}
catch(error){
    console.error("Error during login" ,error);
    return res.status(500).json({ message: 'Server Error' });
 
}

})

const updateUser = asyncHandler( async (req, res) => {
    const userId = req.user.id; 
    const { name, email, gender, birthday,  weight, height} = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, { name, email , gender, birthday,  weight, height}, { new: true });
        res.status(200).json(updatedUser);
        console.log(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user profile' });
    }
});




 const getUserProfile = asyncHandler(async (req, res) => {
    const userId = req.user._id; 

    const activities = await Activity.find({user : req.user._id});
    const goals = await Goal.find({user : req.user._id})


    try {
        const user = await User.findById(userId).select('-password'); 
        if (user) {
            res.json({ _id: user._id, name: user.name, email: user.email,gender: user.gender, birthday: user.birthday, weight:user.weight, height:user.height, passion:user.passion, profilePicture:user.profilePicture, goals:goals, activities: activities,});
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = {registerUser,loginUser,getUserProfile,updateUser}