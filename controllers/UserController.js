import { UserModel } from '../models/UserModel.js'

export const fetchUserData = async (req, res) => {
    //user is an object that comes from the data object in clerk
    const data = req.body
    try {
        const userExists = await UserModel.findById(data._id)

        if (userExists) {
            return res.status(200).json(userExists)
        } else {
             res.status(500).json({message: "User does not exist" })
        }
        return res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({message: error.message })
    }
}

export const getUserById = async (req, res) => {
    const { id } = req.params

    try {
        const user = await UserModel.findById(id)
        return res.status(200).json(user)
    } catch (error) {
        return res.status(404).json({
        message: "User not found",
        error: error.message || "Unknown error",
        });
    }
}