# Back-end-task
 Creating an autehtication api with jwt tokens


 After adding the requested commands to the test scripts file
 I proceeded to create a server.js file

 In this file i created a /users route which when  visited without authorization
 in other words without the user having a jwt key will throw a 404

Overview of all the code and responses
![alt](https://github.com/Jayyy123/Back-end-task/blob/main/back-end-test-images/overview.png)


Generating an env file to house our access token and refreshtoken gotten using uui.v4 then adding it to the main
server file using 'dotenv'
![alt](https://github.com/Jayyy123/Back-end-task/blob/main/back-end-test-images/envfile.png)


Winston logger
![alt](https://github.com/Jayyy123/Back-end-task/blob/main/back-end-test-images/Winston%20logger.png)

Access token generated by the refresh token functionality
![alt](https://github.com/Jayyy123/Back-end-task/blob/main/back-end-test-images/access%20token%20generated%20by%20the%20refresh%20token.png)

Adding a refresh token functionality
![alt](https://github.com/Jayyy123/Back-end-task/blob/main/back-end-test-images/adding%20refresh%20token%20functionality.png)

function to invalidate an access token after 20 seconds
![alt](https://github.com/Jayyy123/Back-end-task/blob/main/back-end-test-images/function%20to%20invalidate%20a%20jw%20token%20after%2020s.png)

After 20 seconds of an access key being issued the key will be invaliodated and a forbidden error will be thrown
![alt](https://github.com/Jayyy123/Back-end-task/blob/main/back-end-test-images/after%2020seconds%20of%20an%20authorization%20key%20being%20issued.png)

Posting the refresh token to get a new access token endpoint
![alt](https://github.com/Jayyy123/Back-end-task/blob/main/back-end-test-images/posting%20the%20refresh%20token%20to%20get%20a%20new%20access%20token.png)


Using requests exxtension on vs code to test the endpoints
![alt](https://github.com/Jayyy123/Back-end-task/blob/main/back-end-test-images/using%20the%20requests%20extension%20to%20test%20the%20endpoints%20of%20the%20api.png)

Username and password endpoint
![alt](https://github.com/Jayyy123/Back-end-task/blob/main/back-end-test-images/the%20username%20and%20password%20endpoint.png)


