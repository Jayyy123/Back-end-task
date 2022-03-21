const express = require('express')
const app = express()
const uuid = require('uuid')
require('dotenv').config()

console.log(uuid.v4())

app.use(express.json())
const jsonwebtoken = require('jsonwebtoken')

// no database since it is a mockup 
var refresh_tokens = []

app.post('/token', (request,response)=>{
    const refresh_token = request.body.token
    if(refresh_tokens==null) return response.statusCode(403)
    if(!refresh_tokens.includes(refresh_token)) return response.sendStatus(403)
    jsonwebtoken.verify(refresh_token,process.env.REFRESH_TOKEN_SECRET,(error,user)=>{
        if(error) return response.sendStatus(403)
        const access_token = generateAccessToken({name:user.name})

        response.json({accessToken:access_token})
    })
})

app.post('/login/:id', (request, response) =>{
    const auth_user = request.url.split('login/')
    console.log(auth_user)
    const username = request.body.username
    const user = { name: username}
    const access_token = generateAccessToken(user)
    const refresh_token = jsonwebtoken.sign(user, process.env.REFRESH_TOKEN_SECRET)
    refresh_tokens.push(refresh_token)
    response.json({ accessToken:access_token, refreshToken:refresh_token })
})


app.delete('/logout',(request,response)=>{
    refresh_tokens = refresh_tokens.filter(t => t !== request.body.token)
    response.sendStatus(204)
})


function generateAccessToken(user){
    return jsonwebtoken.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'20s'})
}

