const express = require("express");
const formData = require("form-data");
const Mailgun = require("mailgun.js");
const route = express.Router();


/* MAILGUN CONFIGURATION */
const mailgun = new Mailgun(formData);
const client = mailgun.client({
  username: "ShueiYang",
  key: process.env.MAILGUN_API_KEY, 
});


route.post("/", async (req, res)=> {
    try {
        const { firstName, lastName, email, message } = req.body;     
  
        const messageData = {
            from: `${firstName} ${lastName} <${email}>`,
            to: "yangshuei83@gmail.com",
            subject: `Formulaire contact TripAdvisor`,
            text: message,
        };
        const response = await client.messages.create(process.env.MAILGUN_DOMAIN, messageData)
        // console.log(response)
        if(response.status === 200 ) {
            return res.status(200).json(response);
        } 
        
    } catch (err) {
        console.error(err)
        if(err.status === 401 || err.status === 403) {
            return res.status(err.status).json({message: "MailgunApiError cannot send message"})
        }
        res.status(500).json({ message: err.message });
    }
})

module.exports = route;