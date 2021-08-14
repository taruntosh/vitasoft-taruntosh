const express = require('express')
const router = express.Router()
const Form = require('../../models/Form')
const auth = require('../../middleware/auth')

//Post values in form with <<jwtToken>> (<<user_id>> not needed)
router.post('/save-details',auth,
    async(req,res)=> {
        
            const {firstname,middlename,lastname,address,phone_number,height,weight}= req.body

            const formfields = {}
            formfields.user = req.user.id
            if (firstname) formfields.firstname = firstname;
            if (middlename) formfields.middlename = middlename;
            if (lastname) formfields.lastname = lastname;
            if (address) formfields.address = address;
            if (phone_number) formfields.phone_number = phone_number;
            if (height) formfields.height = height;
            if (weight) formfields.weight = weight;

        try {
            let form = await Form.findOne({user: req.user.id})
            if (form) {
                form = await Form.findOneAndUpdate(
                    {user: req.user.id},
                    {$set: formfields},
                    {new: true}
                )
                return res.json({message:'Form is updated.'})
            }

            //Create new form
            form = new Form(formfields)
            await form.save()
            res.json({message: 'Created form successfully.'})

        } catch (error) {
            console.error(error.message);
            res.status(500).json({error:'Server error'})
        }
    }

)

//View form details with <<user_id>>
router.get('/view-details/:user_id',auth,
    async(req,res)=> {
        try {
            const form = await Form.findOne({user:req.params.user_id}).populate('user',['username','email'])
            if (!form) {
                return res.status(400).json({error:"You don't have any forms"})
            }
            res.json(form)
        } catch (error) {
            console.error(error.message)
            res.status(500).send('Server error')
            
        }
    } )


//Delete form details with <<user_id>>
router.delete('/delete-details/:user_id', auth,
    async(req,res) => {
        try {
            await Form.findOneAndRemove({user : req.params.user_id})
            res.json({message: 'Form deleted successfully.'})
        } catch (error) {
            console.error(error.message)
            if(error.kind=='ObjectId') {
                return res.status(400).json({error:"You don't have any forms"})
            }
            res.status(500).send('Server error')
        }
    }    
)

module.exports = router;
