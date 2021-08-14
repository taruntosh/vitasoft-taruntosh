const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const User = require('../../models/User')


//Creates new user
router.post('/register',[
    check('email', 'Email address is required').isEmail(),
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Enter password with minimum 8 characters').isLength({min:8}),
], async(req,res)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    } 
    const {email,username, password}= req.body
    try {
        let user = await User.findOne({username})
        if(user) {
            return res.status(400).json({error:"User already exists "})
        }

        user = new User({
            email,
            username,
            password
        })

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)
        await user.save();
        res.json({'message':'User registration successfull.'})

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server error')
        
    }   
})

//Get all users
router.get('/all', 
async(req,res)=> {
try {
    const user = await User.find().select('-password')
    res.json(user)
} catch (error) {
    console.error(error.message);
    res.status(500).json({message:'Server error'})
}}
)

module.exports = router;
 