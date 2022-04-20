// jshint esversion: 6
const express = require("express") ;
const bodyParser = require("body-parser");
const request = require("request") ;
const app = express() ;
const https = require("https") ;
const { post } = require("request");
const { json } = require("body-parser");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));


app.use(express.static("public")); //public is static folder for holding static files
app.get("/" , function( req , res)
{
   res.sendFile(__dirname + "/signup.html") ;
});

app.post("/" , function( req , res)
{
  const fdata = req.body.fname ;
  const ldata = req.body.lname ;
  const email = req.body.email ;
  const data = {
     members :[{
        email_address : email ,
        status : "subscribed" ,
        merge_fields : {
           FNAME : fdata , 
           LNAME : ldata 
        }
     }] } ;
 

 const jsonData = JSON.stringify(data) ;
  console.log( fdata , ldata  , email );
 
  const url = "https://us14.api.malchimp.com/3.0/lists/4b74d2edd8" ;
  const options = {
     method : "post" ,
     auth :"himanshu12:f42674b70e8b2686234a902aac8554bd-us14" ,

  }

  const request = https.request(url , options , function(response)
  {
     response.on("data" , function(data)
     {
        console.log(JSON.parse(data));
     })
  })
  
  request.write(jsonData);
  request.end();

});



app.listen( 3000 , function()
{
   console.log(" server is running at port 3000 ") ;
});

