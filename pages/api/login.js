import connectDb from "../../utils/connectDb";
import User from "../../models/User";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

connectDb();

export default async (req, res) => {
  const {email, password} = req.body;
  try {
  //  check to see if a user exists with the provided email

  } catch(error) {

  }
}