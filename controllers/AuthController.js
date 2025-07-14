import UserAuthModel from "../models/UserAuthModel.js"
import {UserModel} from '../models/UserModel.js'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const verifyEmail = async (req, res) => {
  const data = req.body;

  try {
    const existingUser = await UserAuthModel.findOne({ email: data.email });

    if (existingUser) {
      throw new Error("A user with this email already exists.");
    }

    return res.status(200).json({ message: "Email is available" });
  } catch (error) {
    console.error("verifyEmail error:", error); // ✅ ADD THIS
    return res.status(500).json({ message: error.message });
  }
};

export const verifyUsername = async (req, res) => {
  const data = req.body

  try {
    const existingUser = await UserAuthModel.findOne({username: data.username}) 

    if (existingUser) {
      throw new Error("A user with this username already exists.");
    }

    return res.status(200).json({message: "Account created successfully"})
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}

export const signUp = async (req, res) => {
  const data = req.body 

  try {

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const userAuth = await UserAuthModel.create({
      email: data.email,
      passwordHash: hashedPassword,
      username: data.username
    })

    const newUser = await UserModel.create({ _id: userAuth._id, username: userAuth.username});

    return res.status(201).json({message: "Account created succesfully"})
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}

export const signIn = async (req, res) => {
  const data = req.body
  
   try {
    const existingUser = await UserAuthModel.findOne({email: data.email}) 

    if (!existingUser) {
      throw new Error("Email does not exist");
    }

    const isMatch = await bcrypt.compare(data.password, existingUser.passwordHash);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      {id: existingUser.id, email: existingUser.email},
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    )

    // Send it as HttpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000 // 1 hour
    });

    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}

export const signOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({ message: "Successfully signed out" });
  } catch (error) {
    return res.status(500).json({ message: "Sign out failed" });
  }
};

export const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user data
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};