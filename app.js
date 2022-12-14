require('dotenv').config();
const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");
const https = require("https");
const path = require("path");
const mailchimp = require('@mailchimp/mailchimp_marketing');
const { response } = require('express');
const app = express();

// Static folder
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({extended: true}));


app.listen(3000, function(){
    console.log("Server is running on port 3000");
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + "/signup.html")

    // console.log(process.env.MC_API_KEY)
    // console.log(process.env.MC_SERVER)
    // console.log(process.env.MC_LIST_UNIQUE_ID)
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

    mailchimp.setConfig
    ({
       apiKey: process.env.MC_API_KEY
      ,server: process.env.MC_SERVER
    });
    
  const listId = process.env.MC_LIST_UNIQUE_ID;

  const subscribingUser = {
   firstName: firstName
  ,lastName: lastName
  ,email: email
};

async function run() {
  try{
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: subscribingUser.email
      ,status: "subscribed"
      ,merge_fields: {
        FNAME: subscribingUser.firstName
        ,LNAME: subscribingUser.lastName
      }
    });

    console.log(
      `Successfully added contact as an audience member. The contact's id is ${
        response.id
      }.`  
    );
    res.sendFile(__dirname + "/success.html")
  }
  catch{
    res.sendFile(__dirname + "/failure.html")

    }  
}

run()
});


app.post("/failure", function(req,res){
  res.redirect("/");
});


// async function run() {
//   const response = await mailchimp.lists.addListMember(listId, {
//      email_address: subscribingUser.email
//     ,status: "subscribed"
//     ,merge_fields: {
//        FNAME: subscribingUser.firstName
//       ,LNAME: subscribingUser.lastName
//     }
//   });

//   console.log(
//     `Successfully added contact as an audience member. The contact's id is ${
//       response.id
//     }.`  
//   );

//   console.log("response.statusCode: "+response.statusCode);
//   console.log("response.status "+response.status);

//   // if(response.status === "subscribed"){
//   //   res.sendFile(__dirname + "/success.html")
//   //   //res.send('Signed Up!');
//   // }else{
//   //   res.sendFile(__dirname + "/failure.html")
//   //   //res.send('Sign Up Failed :(');
//   // }  

// }
// // console.log("response.statusCode: "+response.statusCode);
// // console.log("response.status "+response.status);

// run()
// try{
//   run()
// }
// run().catch(res.sendFile(__dirname + "/failure.html"));
// try {
//   run()
// } catch (e) {
//   console.error(e);
// } finally {
//   console.log('We do cleanup here');
// }


//run();




// console.log(response.status);
// console.log(response.statusCode);

// const options = {
//    method: 'POST'
//   ,apiKey: process.env.MC_API_KEY
//   }

//   const request = https.request("https://"+process.env.MC_SERVER+".api.mailchimp.com/3.0/lists"+process.env.MC_LIST_UNIQUE_ID+"/members/"
//   , options
//   , function(response){

//     console.log(response.status);
//     cconsole.log(response.statusCode);

//     if(response.statusCode === 200){
//       //res.sendFile(__dirname + "/success.html")
//       res.send('Signed Up!');
//     }else{
//       //res.sendFile(__dirname + "/failure.html")
//       res.send('Sign Up Failed :(');
//     }

//     response.on("data", function(data){
//       console.log(JSON.parse(data));
//     });
//   });

//request.write(jsonData);
//request.end();




    // mailchimp.setConfig({
    //   apiKey: process.env.MC_API_KEY,
    //   server: process.env.MC_SERVER,
    //   listUniqueId: process.env.MC_LIST_UNIQUE_ID
    // });
  //   async function callPing() {
  //     const response = await mailchimp.ping.get();
  //     console.log(response);
  //   }
    
  //   callPing();
  //   console.log(process.env.MC_API_KEY);
  //   console.log(process.env.MC_SERVER);
  //   console.log(process.env.MC_LIST_UNIQUE_ID);
//   const subscribingUser = {
//   firstName: "Paawe??",
//   lastName: "Nowak",
//   email: "Paaawal.Nowak@omomohom.com"
// };

// async function run() {
//   const response = await mailchimp.lists.addListMember(listId, {
//     email_address: subscribingUser.email,
//     status: "subscribed",
//     merge_fields: {
//       FNAME: subscribingUser.firstName,
//       LNAME: subscribingUser.lastName
//     }
//   });

//   console.log(
//     `Successfully added contact as an audience member. The contact's id is ${
//       response.id
//     }.`
//   );
// }

// run();
  // const md5 = require("md5");

  // const email = "poreba.mateusz@gmail.com";
  // const subscriberHash = md5(email.toLowerCase());
  
  // async function run() {
  //   try {
  //     const response = await mailchimp.lists.getListMember(
  //       listId,
  //       subscriberHash
  //     );
  
  //     console.log(`This user's subscription status is ${response.status}.`);
  //   } catch (e) {
  //     if (e.status === 404) {
  //       console.error(`This email is not subscribed to this list`, e);
  //       console.log(`This email is not subscribed to this list`, e);
  //     }
  //   }
  // }
  // run();





  


//////////////////////
    // async function callPing() {
    //   const response = await mailchimp.ping.get();
    //   console.log(response);
    // }
    // callPing();
//////////////////////
  //const listId = process.env.MC_LIST_UNIQUE_ID;









//   app.post('/', (req, res) => {
//     const firstName = req.body.fName;
//     const lastName = req.body.lName;
//     const email = req.body.email;
//     // if(!firstName || !lastName || !email){
//     //   res.redirect('/failure.html');
//     //   return;
//     // }
//     console.log(firstName, lastName, email);
//     console.log(req.body);

//     mailchimp.setConfig({
//       // apiKey: process.env.MC_API_KEY,
//       // server: process.env.MC_SERVER,

//     });
    


// //////////////////////
//     // async function callPing() {
//     //   const response = await mailchimp.ping.get();
//     //   console.log(response);
//     // }
//     // callPing();
// //////////////////////
//   //const listId = process.env.MC_LIST_UNIQUE_ID;
//   const listId = "7b9e90b60a";
// console.log(listId);
// console.log(mailchimp.config);

//   async function run() {
//     const response = await mailchimp.lists.addListMember(listId, {
//       email_address: email,
//       status: "subscribed",
//       merge_fields: {
//         FNAME: firstName,
//         LNAME: lastName
//       }
//     });

    
//     // async function callPing() {
//     //   const response = await mailchimp.ping.get();
//     //   console.log(response);
//     // }
    
//     // callPing();

//     console.log(
//       `Successfully added contact as an audience member. The contact's id is ${
//         response.id
//       }.`
//     );
//   }

//   run();
// });




//   app.post('/', (req, res) => {
//     const firstName = req.body.fName;
//     const lastName = req.body.lName;
//     const email = req.body.email;
//     // if(!firstName || !lastName || !email){
//     //   res.redirect('/failure.html');
//     //   return;
//     // }
//     console.log(firstName, lastName, email);
//     console.log(req.body);

//     mailchimp.setConfig({
//       apiKey: process.env.MC_API_KEY,
//       server: process.env.MC_SERVER,
//     });
// //////////////////////
//     async function callPing() {
//       const response = await mailchimp.ping.get();
//       console.log(response);
//     }
//     callPing();
// //////////////////////
//   const listId = process.env.MC_LIST_UNIQUE_ID;
// console.log(listId);
// console.log(mailchimp.config);

//   async function run() {
//     const response = await mailchimp.lists.addListMember(listId, {
//       email_address: email,
//       status: "subscribed",
//       merge_fields: {
//         FNAME: firstName,
//         LNAME: lastName
//       }
//     });

//     async function callPing() {
//       const response = await mailchimp.ping.get();
//       console.log(response);
//     }
    
//     callPing();

//     console.log(
//       `Successfully added contact as an audience member. The contact's id is ${
//         response.id
//       }.`
//     );
//   }

//   run();
//     });
  // if (response.statusCode < 300 || (response.statusCode === 400 && response.body.title === "Member Exists")) {
  //   res.send('Signed Up!');
  // } else {
  //   res.send('Sign Up Failed :(');
  // }
  

  //





