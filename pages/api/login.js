import connectDb from "../../utils/connectDb";
import User from "../../models/User";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

connectDb();

export default async (req, res) => {
  const {email, password} = req.body;
  try {
    //  check to see if a user exists with the provided email
    // select method allows us to alter db model password select from false to true
    // this makes it possible to send the pw to either the client or server
    // from db
    const user = await User.findOne({email}).select('+password');
    //  if not return an error
    if (!user) {
      return res.status(404).send("No user exists with that email.")
    }
    //  check to see if users' pw matches to db
    const passwordsMatch = await bcrypt.compare(password, user.password);
    //  if yes generate token

    if (passwordsMatch) {
      const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
      //  send token to the client
      res.status(200).json(token);
    } else {
      res.status(401).send(`Passwords do not match.`)
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error logging in user.')
  }
}