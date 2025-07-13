import { UserModel } from '../models/UserModel.js'

export const pushUserToDB = async (req, res) => {
    //user is an object that comes from the data object in clerk
    const { user } = req.body
    try {
        const userExists = await UserModel.findById(user.id)

        //change users' names
        // await UserModel.updateOne({_id: user.id}, {
        //     username: user.username,
        //     imageUrl: user.imageUrl
        // })

        if (userExists) {
            return res.status(200).json(userExists)
        }

        const newUser = await UserModel.create({ _id: user.id, username: user.username, imageUrl: user.imageUrl });
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