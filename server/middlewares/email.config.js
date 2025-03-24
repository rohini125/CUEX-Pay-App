import nodemailer from 'nodemailer'
import dotenv from "dotenv"
dotenv.config();
export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.OTP_EMAIL_USER,
      pass: process.env.OTP_EMAIL_PASS ,
    },
  });

  const SendEmail =async()=>{
    try{
        const info = await transporter.sendMail({
            from: '"CUEX-App  👻" <navalekomal981@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
          });
          console.log( info);
    }catch(error){
     console.log(error);
    }
  }

  SendEmail()