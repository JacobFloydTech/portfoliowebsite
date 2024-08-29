'use server'
import nodemailer from 'nodemailer';


export async function SendMail(name: string, email: string | null, phone: string | null, message: string) {
    const transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: { 
            user: "jacobfl2013@gmail.com",
            pass: process.env.SMTP_PASSWORD
        },
    })
    const options = { 
        from: 'jacobfl2013@gmail.com',
        to: 'jacobfl2013@gmail.com',
        subject: `Message from ${name}, email ${email}, phoneNumber ${phone}`,
        text: message,
    }
    return new Promise((resolve ,reject) => { 
        transport.sendMail(options, (error, info) => { 
            resolve(error != null);
        })
    })
}