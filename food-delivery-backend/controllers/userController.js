import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"



// Login user 
const loginUser = async (req,res) => {
     const {email,password} = req.body;
     try{
      const user = await userModel.findOne({email})

      if(!user) {
        return res.json({success:false,message:"User is not Exist Please Register"})
      }
      const isMatch = await bcrypt.compare(password,user.password)

      if(!isMatch){
        return res.json({success:false,message:"Password is Incorrect"})
      }

      const token = createToken(user._id);
      res.json({success:true,token})

     }catch (error) {
         console.log(error);
         res.json({
            success:false,
            message:"an error Occured"
         })
     }
}

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}
    
// register user
const registerUser = async(req,res) =>{
    const {name,password,email} = req.body;
    try{
        // checking user already exist 
      const exists = await userModel.findOne({email});
      if(exists){
        return res.json({success:false,message:"User already Exists"})
      }

      //validating email format and strong password 
      if (!validator.isEmail(email)){
           return res.json({success:false,message:"Email Format is not correct"})
      }

      if(password.length<8){
        return res.json({success:false,message:"Enter a Strong Password"})
      }

      // hashing user password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password,salt);

      const newUser = new userModel({
        name:name,
        email:email,
        password:hashedPassword
      })
      const user = await newUser.save()
      const token = createToken(user._id)
      res.json({success:true,token});

    }catch (error){
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

export {loginUser,registerUser}