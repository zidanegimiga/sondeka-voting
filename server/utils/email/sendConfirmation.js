const nodemailer = require('nodemailer');

module.exports = async (options) => {
    try{
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            service: process.env.EMAIL_SERVICE,
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const {email, subject, html} = options;

        await transporter.sendMail(
            {
                from: process.env.EMAIL_USER,
                to: email,
                subject: subject,
                html: html
            }
        )

        console.log(`Email to ${email} from ${process.env.EMAIL_USER} sent successfully!`)
    } catch(error){}
}
