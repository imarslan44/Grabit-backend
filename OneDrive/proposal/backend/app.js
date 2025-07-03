import express from "express";
import dotenv from "dotenv"
import connectDb from "./database/mongodb.js";
import Ans from "./models/response.model.js";
import nodemailer from "nodemailer";
import cors from "cors"
const app = express();

dotenv.config()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/" ,(req, res)=>{
 res.send("wellcome to server")
})

app.post("/", async(req, res)=>{

    const response = req.body;
    try{
    const answer = await Ans.create({
     res: response.res
    });
    
     let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "imarslan444@gmail.com",
                pass: "wddk gpme smql gqha" // Use an App Password, not your real password
            }
        });

         let mailOptions = {
            from: "imarslan444@gmail.com",
            to: "imarslan444@gmail.com",
            subject: "Proposal Response Received!",
            text: `She pressed: ${response.res}`
        };
         await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });

        res.json({ success: true, message: "Data saved!", data: answer });

    } catch(err){
        console.log(err);
        res.status(500).json({ success: false, message: "Error saving data" });
    }
})

app.listen(4000,()=>{
    console.log('server is running on http://localhost:4000');
    connectDb()
})