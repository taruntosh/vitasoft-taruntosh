const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')


//Login and get token
router.post('/',[
    check('username', 'Name is required').not().isEmpty(),
    check('password', 'Password is required').exists(),
], 
    async(req,res)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    } 
    const {username, password}= req.body
    try {
        let user = await User.findOne({username})
        if(!user) {
            return res.status(400).json({error:"Invalid Username or Password"})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({error:"Invalid Username or Password"})
        }

        const payload = {
            user : {
                id: user.id
            }
        }
        jwt.sign(payload, config.get('jwtToken'), 
        (err,token) =>{
            if(err) throw err;
            res.json({token})
        } )
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server error')
        
    }   
}) 


module.exports = router;
 