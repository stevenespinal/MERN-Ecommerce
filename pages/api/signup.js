import connectDb from "../../utils/connectDb";
import User from "../../models/User";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

connectDb();

export default async (req, res) => {
  const {name, email, password} = req.body;
  try {
    //  check if user exists in DB
    const user = await User.findOne({email});
    if (user) {
      return res.status(422).send(`User already exists with email: ${email}`)
    }
    //  hash password if new user
    //  bcrypt takes two parameters to hash its password
    //  first is the info you need hashed, second is amt of rounds
    //  to process, look at bcrypt docs later
    const hash = await bcrypt.hash(password, 10);
    //  create user
    const newUser = await new User({
      name,
      email,
      password: hash
    }).save();
    //  create jwt for user
    const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });
    //  send token back
    res.status(201).json(token);
    console.log(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error signing up user. Please try again later.')
  }
}