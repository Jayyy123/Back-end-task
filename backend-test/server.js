const express = require('express')
const app = express()
const uuid = require('uuid')
const winston = require('winston')
const express_winston = require('express-winston');
const requests = require('request')
const authenticateT = require('./loginserver')
require('dotenv').config()

const jsonwebtoken = require('jsonwebtoken')
// const { contentType } = require('express/lib/response')

app.use(express_winston.logger({
    transports: [
      new winston.transports.Console()
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: false,
    msg: "HTTP  ",
    expressFormat: true,
    colorize: false,
    ignoreRoute: function (req, res) { return false; }
  }));


uuid.v4()

app.use(express.json())


const users = [
    {
        username: 'Jay',
        password: '00000'
    },
    {
        username: 'Joe',
        password: '00000'
    },
    {
        username: 'Jack',
        password: '00000'
    },
    {
        username: 'John',
        password: '00000'
    },
    {
        username: 'Jim',
        password: '00000'
    },
]
// no database since it is a mockup 


app.get('/users', authenticateToken, (request,response) =>{
    response.json(users.filter(users => users.username === request.user.name))
})


function authenticateToken(request,response,next){
    const auth_headers = request.headers['authorization']
    const token = auth_headers && auth_headers.split(' ')[1]
    if (token == null ) return response.sendStatus(401)

    jsonwebtoken.verify(token, process.env.ACCESS_TOKEN_SECRET, (error,user)=>{
        if(error) return response.sendStatus(403)
        request.user = user
        next()
    })
}
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

app.post('/login/', (request, response) =>{
    // 
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


app.listen(4000)