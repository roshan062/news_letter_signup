const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { url } = require("inspector");
const { send } = require("process");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    console.log("post request received.");
    // console.log(req.body);
    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var mailId = req.body.email;
    // console.log(firstName, lastName, mailId); 

    var data = {
        members: [
            {
                email_address: mailId,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                },
            },
        ],
    };

    const jsonData = JSON.stringify(data);

    var url = "https://us5.api.mailchimp.com/3.0/lists/069a07f48c";
    var options = {
        method: "POST",
        auth: "roshan:4e01e94d993aa3951bdc840a667ca091-us5",
    };

   const request = https.request(url, options, function (response) {
        response.on("data", function () {
            console.log(JSON.parse(data));
        });
    });
  
    request.write(jsonData);
    request.end();
    


    res.sendFile(__dirname + "/success.html");
});

app.listen(3000, function () {
    console.log("Server is running on port 3000");
});

// mailchimlp api Key 4e01e94d993aa3951bdc840a667ca091-us5

// audience or list id 069a07f48c
