import User from "../../models/User";
import jwt from 'jsonwebtoken';

export default async (req, res) => {
  try {
    const {userId} = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    // this async await excludes the root user $ne = not equals for mongodb
    const user = await User.find({_id: {$ne: userId}}).sort({email: "asc"});
    res.status(200).json(user)
  } catch (error) {
    console.error(error);
    res.status(403).send("Please login again")
  }
}