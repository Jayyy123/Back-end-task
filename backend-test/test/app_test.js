
const expect = require('chai').expect
const request = require('request')
const {TESTING_URL} = require('../constants/tests')

//for the server.js file, this is where we can see the 
// authenticated's user and password

//if the authentication token is not valid it should 
// show an error and if the user has requested a token 
// for more than 20s it should close and the user can then 
// request for a refresh token

// GET http://localhost:4000/users
// Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9lIiwiaWF0IjoxNjQ3ODgyNDY4LCJleHAiOjE2NDc4ODI0ODh9.hQNhtUuJyKlaUsF5RbiagrYz8Zbq3FnAEI2Ohj4v87c

describe('Get user and password',()=>{
    describe('No authentication key error', ()=>{
        it('Status', done =>{
            const user_id = ''
            request(`${TESTING_URL}/users/`,{},(request,response)=>{
                expect(response.statusCode).to.equal(404)
                done()
            })
        })
    })
})

//for the loginserver.js file
//Logging in the user and getting the users object



// POST http://localhost:5000/login
// Content-Type: application/json

// {
//     "username" : "Joe"
// }



describe('login any user or a user that has been stored',()=>{
    it('Content', done =>{
        request(`${TESTING_URL}/login/`,{},(request,response)=>{

        })
})
})