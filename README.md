# Vitasoft-Taruntosh

This is backend developer **part-2** assessment.

## POST: localhost:5000/user/register
This route registers a new user

    {	"username":"taruntosh",
    	"password":  "srHJ#E*&r4fjssg",
    	"email":"dummy@mail.com" }

## POST: localhost:5000/login
This route gives you token.
Pass this json inside body.

    {  "username":"taruntosh",
       "password":  "srHJ#E*&r4fjssg" }

## GET: localhost:5000/user/all
This route gives all the users with _id,username and email
Pass token with this request in header with `'x-auth-token'`

## POST: localhost:5000/form/save-details
All the endpoints are required.
Pass the token.

> ObjectId should not be passed here. The user_id(ObjectId) is retrieved from the token itself.

These are the form details in json.

    {   "firstname":"tarun",
        "middlename":  "tosh",
    	"lastname":  "r",
    	"address":  "#24, dummy address",
    	"phone_number":"(+91)9876543210",
    	"height":6,
    	"weight":85 }

## GET: localhost:5000/form/view-details/<<`ObjectId`>>
This route gives the form details of a particular user.
Pass the token
## DELETE: localhost:5000/form/delete-details/<<`ObjectId`>>
This route deletes the form details of a particular user.
Pass the token
