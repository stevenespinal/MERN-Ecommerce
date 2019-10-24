import User from "../../models/User";
import jwt from 'jsonwebtoken';
import connectDb from "../../utils/connectDb";

connectDb();

export default async (req, res) => {
  // this is alternate syntax for !req.headers.authorization
  if (!("authorization" in req.headers)) {
    return res.status(401).send('No authorization token')
  }

  try {
    const {userId} = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    const user = await User.findOne({_id: userId});
    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).send("User not found")
    }
  } catch (error) {
    console.error(error);
    //403 is forbidden
    res.status(403).send("Invalid token");
  }
}