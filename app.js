const express = require("express");
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https");
const { response } = require("express");
const path = require("path");

const app = express()
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}))
app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/signup.html")
})

app.post("/",(req,res)=>{
    var firstName = req.body.Fname
    var lastName = req.body.Lname
    var email =req.body.email
    console.log(firstName)
    console.log(lastName)
    console.log(email)
  const data = {
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    const jasondata= JSON.stringify(data);
    
    const url ="https://us10.api.mailchimp.com/3.0/lists/87f8dd8d78"
    
    const options ={
        method:"POST",
        auth:"gbr1:433adc1c66d9ce008db1149d613b776e-us10"
    }
   const request = https.request(url,options,(response)=>{
        response.on("data",(data)=>{
            console.log("data")
           
        })
    })
    request.write(jasondata)
    request.end

})



app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/signup.html")
})

 app.listen(3000,()=> console.log("server is up"));
// 433adc1c66d9ce008db1149d613b776e-us10
//87f8dd8d78