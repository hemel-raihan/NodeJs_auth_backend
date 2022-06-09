const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const checkLogin = require('../middleware/checkLogin')

router.post('/register', async (req,res) =>{
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })

    const result = await user.save()
    const {password, ...data} = await result.toJSON()
    res.send(data)
})

router.post('/login', async (req,res) =>{

    try{
        const user = await User.findOne({email: req.body.email})

        if(!user){
            return res.status(404).send({
                message: 'user not found'
            })
        }
    
        if(!await bcrypt.compare(req.body.password, user.password))
        {
            return res.status(404).send({
                message: 'invalid credentials'
            })
        }
    
        // this is for store token in cookie
    
        const token = jwt.sign({_id: user._id}, "secret")
    
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 24*60*60*1000 //1 day
        })
    
        res.send({
            message: 'success'
        });
    
    
    
        // this is for store token in access token and for the client side localstorage/sessionstorage
    
        // const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {
        //     expiresIn: '1h'
        // })
    
        // res.status(200).json({
        //     "access_token": token,
        //     "message": 'Login Successfully'
        // })


    }catch(e){
        return res.status(404).send({
            message: 'invalid credentials'
        })
    }
    

})

router.get('/user', checkLogin, async(req,res) =>{
    try{
        const cookie = req.cookies['jwt']

        const claims = jwt.verify(cookie, 'secret')
    
        if(!claims){
            return res.status(401).send({
                message: 'unauthenticated!'
            })
        }
    
        const user = await User.findOne({_id: claims._id})
    
        const {password, ...data} = await user.toJSON()
    
        res.send(data)
    }
    catch(e){
        return res.status(401).send({
            message: 'unauthenticated!'
        })
    }
    
})


router.get('/userlist', async(req,res) =>{
    try{
        const cookie = req.cookies['jwt']

        const claims = jwt.verify(cookie, 'secret')
    
        if(!claims){
            return res.status(401).send({
                message: 'unauthenticated!'
            })
        }
       
        User.find({}, function(err,users){
            if(err){
                res.send('something wrong')
                next()
            }
            res.json(users)
        })

    }catch(e){
        return res.status(401).send({
            message: 'unauthenticated!'
        })
    }
    
})


router.post('/logout', async(req,res) =>{
    res.cookie('jwt', '', {maxAge: 0})

    res.send({
        message: 'successfully logout'
    })
})

module.exports = router;