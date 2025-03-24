import { Email_Template } from "../templates/emailTemplate.js";
import { transporter } from "./email.config.js";

export const SendVerificationCode = async(email,otp) =>{
    try {
        const response = await transporter.sendMail({
            from: '"CUEX-App " <navalekomal981@gmail.com>', // sender address
            to: email ,// list of receivers
            subject: "Verify your email", // Subject line
            text: "Verify your email", // plain text body
            // html: otp, // html body
            html:Email_Template.replace("{otp}",otp),//html body
          });
          console.log("email send successfully !",response);
          
    } catch (error) {
        console.log("email send error");
        
    }
}
