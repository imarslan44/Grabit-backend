import User from "../models/user.model.js";

export const getUserData = async (req , res)=>{
    const {_id} = req.user;
  console.log( _id)

    try{
        const user = await User.findById(_id)

        if(!user) return res.statu(200).json({
            success: false,
            message: "user not found"});

        return res.status(200).json({
            success: true,
            message: "user data retreived",
            user
        })

    }catch(error){
        res.status(500).json("Internal server error")
        console.log(error);

    }

}