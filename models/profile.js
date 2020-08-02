const mongoose = require('mongoose');

const ProfileSchema =  new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    phone:{
        type:String,
        required:false
    }
})
module.exports = Profile = mongoose.model('Profile',ProfileSchema);
