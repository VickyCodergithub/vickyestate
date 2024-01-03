import mongoose from "mongoose";


const userSchema=new mongoose.Schema({
    username:{
        type: String,
        required:true,
        unique:false,

    },    email:{
        type: String,
        required:true,
        unique:false,

    },    password:{
        type: String,
        required:true,
       

    },
    avatar: {
        type: String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSibRhC_l2NylzcKzyuNT8H2PnInA0l93Rg7AVfSJqzKw&s"},
},
{timestamps: true}
);

const User = mongoose.model("User", userSchema)

export default User;