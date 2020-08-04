# Deployed at https://note-lu.herokuapp.com/

Endpoints:
# Sajit Khadka
1. Login:

        https://note-lu.herokuapp.com/api/users/login
        method: post
        body: {
          "email":"sajitkhadka@gmail.com",
          "password":"nepal"
        }

2. Signup: (Signp is done by Sajit which is modified by Prekshya to send email verification)

        https://note-lu.herokuapp.com/api/users/register
        method: post
        body:{
          "name":"Sajit Khadka",
        "dob":"1994-05-20",
        "email":"n01323814@humbermail.ca",
        "password":"nepal"
        }
        After this a verfication email would be sent. after clicking the link it will send the request to server with the url as:
        http://note-lu.herokuapp.com/api/users/authentication/jwt-token-encrypted (this process is authomatic as browser will send the get request from url after clicking.)
        Then the user will be registered.

        Please check your spam for verification link.
    
 3. Adding Subscribers:
 
        http://note-lu.herokuapp.com/api/subscribers
        method: post
        body:{
          "email:"example@example.com"
        }
    
   

4. Add Schedule

        https://note-lu.herokuapp.com/api/schedule/add
        method: post
        header:{
          Authorization: "jwt-token-that-you-get-from-login-in
        }
        body:{
              "title": "Mern Exam",
              "start": "2020/08/15 3:00",
              "end": "2020/08/15 5:00",
              "label": "college",
              "allDay": false,
              "selectable": true
        }

5. Get All schedules
   
       https://note-lu.herokuapp.com/api/schedule/
       method: get
       header:{
            Authorization: "jwt-token-that-you-get-from-login-in
        }
        
6. Delete Schedule
 
         https://note-lu.herokuapp.com/api/schedule/
         method: delete
         header:{
                    Authorization: "jwt-token-that-you-get-from-login-in
                }
        body:{
          "id": "5f2993fb0e31c600172c588f"  //This is id of the schedule you want to delete
        }
        
        
 7. Update Schedule
    
        https://note-lu.herokuapp.com/api/schedule/
        method:put
        header:{
                    Authorization: "jwt-token-that-you-get-from-login-in
         }
        body:
        {
            "id": "5f2716d905b7a15170d270d2",
            "title": "Android Assignment",
            "start": "2020-08-04T22:00:00.000Z",
            "end": "2020-08-04T03:27:00.000Z",
            "label": "college",
            "allDay": false,
            "selectable": true
        }
     
     
 # Prekshya Aryal
  1. Signup after email verification(Partly done by Sajit)
       
       
                https://note-lu.herokuapp.com/api/users/register
                method: post
                body:{
                  "name":"Prekshya Aryal",
                "dob":"1992-05-20",
                "email":"n01323774@humbermail.ca",
                "password":"nepal"
                }
                After this a verfication email would be sent. after clicking the link it will send the request to server with the url as:
                http://note-lu.herokuapp.com/api/users/authentication/jwt-token-encrypted (this process is authomatic as browser will send the get request from url after clicking.)
                Then the user will be registered.

                Please check your spam/social as well for verification link.
    
  2. Reset Password by sending email link
       
    http://note-lu.herokuapp.com/api/users/forgotpassword
    method: post
    body:
    {
    "email":"n01323774@humbermail.ca"
    }
    After this a link to reset password would be sent to your email. Please check your spam or social as well. after that it would redirect to a web page which will do a post method to submit the new password but in our case, we have to use postman to post the link you get.
        
  
  3. Reset Password after you get the link from email.
  
         Sample url that you get from email.  
         http://note-lu.herokuapp.com/api/users/forgotpassword/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjk5ODRkMGUzMWM2MDAxNzJjNTg5MCIsImlhdCI6MTU5NjU2MTYxNywiZXhwIjoxNTk2NTYyODE3fQ.x3LQlLAWzz3Hmtn5SDhvHhAAKzr8FWY5IKidxxZQMV8
         method: post
         body:
         {
            "newPassword":"nepal2"
         }
  
  
  # Marinelle
  1. Update Profile
          
                http://note-lu.herokuapp.com/api/users/update
                method: POST
                {
                "name":"Marinelle Reys",
                "dob":"2005-02-3",
                "email":"nellebreyes@gmail.ca",
                "password":"1234567",
                "phone":"4372197807"
                }
      
      
   2. Google Login
   
                http://note-lu.herokuapp.com/api/users/google-login
                method: post
                {
                idToken: "Token-you-get-from-google-login"
                }

# Task Division for Server phase only

# Sajit Khadka
  1. Saving Subscriber list
  2. Adding/modifiying/deleting the schedule from server using jwt authorization
  3. Login/Signup
  3. deployment
  
  
# Marinelle
  1. Login using google
  2. edting profile and saving changes to database using validation and jwt authorization
  
  
# Prekshya
 1. Signup after email verification. 
 2. Resetting password through email verification.




