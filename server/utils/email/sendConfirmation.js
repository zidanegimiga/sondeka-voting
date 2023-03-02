const nodemailer = require('nodemailer');

module.exports = async (options) => {
    try{
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            service: process.env.EMAIL_SERVICE,
            port: 465,
            secure: Boolean(process.env.SECURE),
            auth: {
                user: "no-reply@sondeka.org",
                pass: process.env.EMAIL_PASS
            }
        });

        const {email, subject, html} = options;

        await transporter.sendMail(
            {
                from: "no-reply@sondeka.org",
                to: email,
                subject: subject,
                html: html
            }
        )

        console.log(`Email to ${email} sent successfully!`)
    } catch(error){}
}