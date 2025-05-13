import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'


export const signup = async (req, res) => {
    const { name, password, confirmPassword } = req.body

    if (!name || !password || !confirmPassword) return res.status(400).json({ success: false, message: "All Fields are required!" })

    if (password !== confirmPassword) return res.status(400).json({ success: false, message: "password and confirm password should be same!" })

    let checkUser = await User.findOne({ name })
    if (checkUser) return res.status(400).json({ success: false, message: "User Already Exists" })

    const hashedPass = bcryptjs.hashSync(password, 10)

    const newUser = new User({ name, password: hashedPass })
    newUser.save()

    res.status(200).json({
        success: true,
        message: "New User Created",
        user: newUser
    })
}

export const login = async (req, res) => {
    const { name, password } = req.body

    // find user
    let user = await User.findOne({ name })
    if (!user) return res.status(400).json({ success: false, message: "User does not Exist" })

    const validPass = bcryptjs.compareSync(password, user.password)
    if (!validPass) return res.status(400).json({ success: false, message: "Password is Incorrect" })


    const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET)


    res.status(200).json({
        success: true,
        message: "Logged In!",
        token,
        profile: { ...user._doc, password: null }
    })

}

// change password
export const changeUserCredentials = async (req, res) => {

    let { oldPassword, newPassword } = req.body
    let { userId } = req?.params

    console.log(userId)
    let user = await User.findOne({ _id: userId })

    if (!user) return res.status(401).json({ success: false, message: "user doesn't exist" })


    if (!oldPassword) return res.status(401).json({ success: false, message: "you must add your old password" })

    const validatePass = await bcryptjs.compareSync(oldPassword, user.password)
    if (!validatePass) return res.status(401).json({ success: false, message: "incorrect old password" })

    if (!newPassword) return res.status(401).json({ success: false, message: "add a new password" })

        console.log(user)
    const hashNewPass = await bcryptjs.hashSync(newPassword, 10)
    await User.findByIdAndUpdate(userId, { password: hashNewPass }, { new: true })

    return res.status(200).json({ success: true, message: "Password changed successfully", profile: { ...user._doc, password: null } })

}
