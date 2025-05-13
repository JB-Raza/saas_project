import express from 'express'
import {login, signup, changeUserCredentials} from '../controllers/auth.controller.js'


const router = express.Router()

router.post("/signup", signup)
router.post('/login', login)
router.put('/:userId/update', changeUserCredentials)

export default router