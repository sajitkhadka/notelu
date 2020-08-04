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
 
        http://note-lu.herokuapp.com/api/subscribers/add
        method: post
        body:{
          email:"example@example.com"
        }
    
    
 4. Deleting subscribers:
 
        http://note-lu.herokuapp.com/api/subscribers/add
        method: delete
        body:{
          email:"example@example.com"
        }

5. Add Schedule

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

6. Get All schedules
   
       https://note-lu.herokuapp.com/api/schedule/
       method: get
       header:{
            Authorization: "jwt-token-that-you-get-from-login-in
        }
        
 7. Delete Schedule
 
         https://note-lu.herokuapp.com/api/schedule/
         method: delete
         header:{
                    Authorization: "jwt-token-that-you-get-from-login-in
                }
        body:{
          "id": "5f2993fb0e31c600172c588f"  //This is id of the schedule you want to delete
        }
        
  8. Update Schedule
    
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
  1. Signup after email verification
  
    
  2. Reset Password by sending email link
  
  3. 
  
  
  
Since I(Sajit Khadka) copied the code from main repo(where we are doing full project), I have pushed the part that has been previously done by all members.

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
 1. Forgot password (sending password resent link and verify from email) and change password
 3. Adding validation to all part as required




