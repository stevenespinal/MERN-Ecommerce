import {Schema} from 'mongoose';


const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    // select allows you to specify if you'd like to send this data to the client
    //or not
    select: false
  },
  role: {
    type: String,
    required: true,
    default: 'user',
    enum: ["user", "admin", "root"]
  }
}, {
  //allows us to know when the user was created or updated
  timestamps: true
});


// const User = mongoose.model('User', userSchema);

export default mongoose.models.User || mongoose.model('User')