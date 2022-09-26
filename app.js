const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/signup.html")
  });

  app.post('/', (req, res) => {
    firstName = req.body.fName;
    lastName = req.body.lName;
    email = req.body.email;
    console.log(firstName, lastName, email);
  });
// $('#btn').click(function(){
//     $.post(__dirname+'/success.html');
// });

//api key: 3d10cf7beea5477c2a10c63f417c911e-us9
//list id: 7b9e90b60a











