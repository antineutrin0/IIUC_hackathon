import nodemailer from "nodemailer"
import 'dotenv/config'
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import handlebars from "handlebars"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const verifyMail = async (token, email) => {

    const emailTemplateSource = fs.readFileSync(
        path.join(__dirname, "template.hbs"),
        "utf-8"
    )

    const template = handlebars.compile(emailTemplateSource)
    const htmlToSend = template({ token: encodeURIComponent(token) })

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    })

    const mailConfigurations = {
        from: process.env.MAIL_USER,
        to: email,
        subject: 'Email Verification',
        html: htmlToSend,
    }
    transporter.sendMail(mailConfigurations, function (error, info) {
        if (error) {
            throw new Error(error)
        }
        console.log('Email sent successfully');
        console.log(info);


    })
}



// import { readFileSync } from "fs";
// import path from "path";
// import { fileURLToPath } from "url";
// import handlebars from "handlebars";
// import nodemailer from "nodemailer";
// import { MailtrapTransport } from "mailtrap";
// import 'dotenv/config';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // required env vars
// const TOKEN = process.env.MAILTRAP_TOKEN;
// const SENDER_EMAIL = process.env.MAILTRAP_SENDER || "no-reply@example.com";

// if (!TOKEN) {
//   throw new Error("MAILTRAP_TOKEN is missing in .env");
// }

// /**
//  * Send verification email
//  * @param {string} token - verification token
//  * @param {string} email - recipient email
//  * @returns {Promise<object>} nodemailer info
//  */
// export async function verifyMail(token, email) {
//   if (!token || !email) {
//     throw new Error("Missing token or email");
//   }

//   // read Handlebars template
//   const templateSource = readFileSync(path.join(__dirname, "template.hbs"), "utf-8");
//   const template = handlebars.compile(templateSource);
//   const htmlToSend = template({ token: encodeURIComponent(token) });

//   // create transporter using Mailtrap API token
//   const transporter = nodemailer.createTransport(
//     MailtrapTransport({ token: TOKEN })
//   );

//   // mail options
//   const mailOptions = {
//     from: SENDER_EMAIL,
//     to: email,
//     subject: "Email Verification",
//     html: htmlToSend,
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log("Verification email sent:", info.messageId);
//     return info;
//   } catch (err) {
//     console.error("Failed to send verification email:", err);
//     throw err;
//   }
// }
