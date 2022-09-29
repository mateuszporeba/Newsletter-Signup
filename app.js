require('dotenv').config();
const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");
const https = require("https");
const path = require("path");
const mailchimp = require('@mailchimp/mailchimp_marketing');
const app = express();

// Static folder
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/signup.html")

    mailchimp.setConfig({
      apiKey: process.env.MC_API_KEY,
      server: process.env.MC_SERVER,
      listUniqueId: process.env.MC_LIST_UNIQUE_ID
    });
    
    async function callPing() {
      const response = await mailchimp.ping.get();
      console.log(response);
    }
    
    callPing();
    //console.log(process.env);
    console.log(process.env.MC_SERVER);
    //console.log('token ', process.env)
  });

  app.post('/', (req, res) => {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    // if(!firstName || !lastName || !email){
    //   res.redirect('/failure.html');
    //   return;
    // }
    console.log(firstName, lastName, email);
    console.log(req.body);

    mailchimp.setConfig({
      apiKey: "7c92c29df06d7bbb6e445aaea805e2f2-us9",
      server: "us9",
      listUniqueId: "7b9e90b60a"
    });
//////////////////////
    async function callPing() {
      const response = await mailchimp.ping.get();
      console.log(response);
    }
    callPing();
//////////////////////
  const listId = "7b9e90b60a";

  async function run() {
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    });

    console.log(
      `Successfully added contact as an audience member. The contact's id is ${response.id}.`
    );
  }

  run();
  //
              if (response.status < 300 || (response.status === 400 && response.body.title === "Member Exists")) {
                res.send('Signed Up!');
              } else {
                res.send('Sign Up Failed :(');
              }
  //
  });

    
    // var superagent = require('superagent');

    // superagent
    //     .post('https://' + mailchimp.server + '.api.mailchimp.com/3.0/lists/' + mailchimp.listUniqueId + '/members/')
    //     .set('Content-Type', 'application/json;charset=utf-8')
    //     .set('Authorization', 'Basic ' + new Buffer.from('any:' + mailchimp.apiKey ).toString('base64'))
    //     .send({
    //       'email_address': req.email,
    //       'status': 'subscribed',
    //       'merge_fields': {
    //         'FNAME': req.firstName,
    //         'LNAME': req.lastName
    //       }
    //     })
          //   .end(function(err, response) {
          //     if (response.status < 300 || (response.status === 400 && response.body.title === "Member Exists")) {
          //       res.send('Signed Up!');
          //     } else {
          //       res.send('Sign Up Failed :(');
          //     }
          // });







  // app.post('/', (req, res) => {
  //   const firstName = req.body.fName;
  //   const lastName = req.body.lName;
  //   const email = req.body.email;
  //   // if(!firstName || !lastName || !email){
  //   //   res.redirect('/failure.html');
  //   //   return;
  //   // }
  //   console.log(firstName, lastName, email);
  //   console.log(req.body);

  //   mailchimp.setConfig({
  //     apiKey: "7c92c29df06d7bbb6e445aaea805e2f2-us9",
  //     server: "us9",
  //     listUniqueId: "7b9e90b60a"
  //   });

  //   const run = async () => {
  //     const response = await mailchimp.lists.setListMember(
  //       "list_id",
  //       "subscriber_hash",
  //       { email_address: "Marcel81@gmail.com", status_if_new: "pending" }
  //     );
  //     console.log(response);
  //   };
    
  //   run();



    
  //   // var superagent = require('superagent');

  //   // superagent
  //   //     .post('https://' + mailchimp.server + '.api.mailchimp.com/3.0/lists/' + mailchimp.listUniqueId + '/members/')
  //   //     .set('Content-Type', 'application/json;charset=utf-8')
  //   //     .set('Authorization', 'Basic ' + new Buffer.from('any:' + mailchimp.apiKey ).toString('base64'))
  //   //     .send({
  //   //       'email_address': req.email,
  //   //       'status': 'subscribed',
  //   //       'merge_fields': {
  //   //         'FNAME': req.firstName,
  //   //         'LNAME': req.lastName
  //   //       }
  //   //     })
  //         //   .end(function(err, response) {
  //         //     if (response.status < 300 || (response.status === 400 && response.body.title === "Member Exists")) {
  //         //       res.send('Signed Up!');
  //         //     } else {
  //         //       res.send('Sign Up Failed :(');
  //         //     }
  //         // });
  //  });


    

  //   client.setConfig({
  //     apiKey: "7c92c29df06d7bbb6e445aaea805e2f2-us9",
  //     server: "us9",
  //   });
    
  //   const run = async () => {
  //     const response = await mailchimp.lists.addListMember("7b9e90b60a", {
  //       email_address: email,
  //       status: "subscribed",
  //       merge_fields: {
  //         FNAME: firstName,
  //         LNAME: lastName
  //       }
  //     });
  //     console.log(response);
  //   };
    
  //   run();
  // });





  // app.post('/', (req, res) => {
  //   const firstName = req.body.fName;
  //   const lastName = req.body.lName;
  //   const email = req.body.email;
  //   // if(!firstName || !lastName || !email){
  //   //   res.redirect('/failure.html');
  //   //   return;
  //   // }
  //   console.log(firstName, lastName, email);
  //   console.log(req.body);

  //   var data = {
  //     members: [{
  //       email_address: email,
  //       status: "subscribed",
  //       merge_fields: {
  //         FNAME: firstName,
  //         LNAME: lastName
  //       }
  //     }]
  //   };
  // console.log(data);

  //   var jsonData = JSON.stringify(data);

  //   const url = 'https://us9.api.mailchimp.com/3.0/lists/7b9e90b60a';
  //   const options = {
  //     method: "POST",
  //     auth: "auth:7c92c29df06d7bbb6e445aaea805e2f2-us9"
  //   }

  //   const request = https.request(url, options, function(response){
  //     response.on("data", function(data){
  //       console.log(JSON.parse(data));
  //     })
  //   })
  //   request.write(jsonData);
  //   request.end;

  //   //res.send('hello');
  // });




// $('#btn').click(function(){
//     $.post(__dirname+'/success.html');
// });











