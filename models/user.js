const mongoose = require('mongoose');

/*Nelle notes: note _id was removed for google login, as having this will create an issue*/

const userSchema = mongoose.Schema({
  //_id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: { type: String, required: true },
  dob: { type: Date, required: false },
  name: { type: String, required: true },
  phone:{type:String,required:false}
});

module.exports = mongoose.model('User', userSchema);
