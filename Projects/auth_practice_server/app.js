const express = require('express')
const jwt = require('jsonwebtoken')
const app = express() 

require('dotenv').config()
app.use(express.json())

const users = [
    {username: 'johndoe', password: 'password'}, 
    {username: 'marydoe', password: 'password'}
]

app.post('/token', (req, res) => {

    const username = req.body.username 
    const password = req.body.password 

    const persistedUser = users.find(user => {
        return user.username == username && user.password == password 
    })

    if(persistedUser) {
        // generate the token 
         // DO NOT PUT SENSITIVE DATA INTO THE TOKEN 
        const token = jwt.sign({username: username}, process.env.JWT_SECRET_KEY)
        res.json({success: true, token: token})

    } else {
        res.json({success: false, message: 'User is not authenticated!'})
    }

})

app.get('/profile', (req, res) => {

    const authHeader = req.headers['authorization']
    if (authHeader) {
        //Seperate Token From Bearer
        let token = authHeader.split(' ')[1]
        console.log(authHeader)
        console.log(token)

        // Verify The Token and SECRET KEY
        try {
            const decoded = jwt.verify(token, "process.env.JWT_SECRET_KEY")
            console.log(decoded)

            //If Token Is Decoded Takt Out Name That Was Put In the Token In Login Function
            //Checks DB for Extracted Name

            if (decoded) {
                console.log(decoded)
                const username = decoded.username

                let authUser = Users.find(
                    user => user.username == username)
                    
                    if(authUser) => {
                        console.log(persistedUser)
                        res.json(books)
                    })

                // If decoding fails
            } else {
                res.status(401).json({ success: false, message: 'No Authorization Headers Found!!!' })
            }

            // Error with token
        } catch (error) {
            res.status(401).json({ success: false, message: 'Token Has Been Tampered With!!!' })
        }

        // not authenticated
    } else {
        res.status(401).json({ success: false, message: 'No Authorization Headers Found!!!' })
    }
})


app.listen(8080, () => {
    console.log('Server is running...')
})