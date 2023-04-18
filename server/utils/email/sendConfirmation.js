const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const path = require('path')
const fs = require('fs')

module.exports = async (options) => {
    try {
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

        const { email, subject, context } = options;

        //path to the views folder
        const viewsPath = path.join(__dirname, '../../views')

        const source = fs.readFileSync(path.join(viewsPath, 'verificationEmail.hbs'), 'utf8');
        const template = handlebars.compile(source);

        const message = {
            from: process.env.EMAIL_USER,
            to: context.email,
            subject: subject,
            html: template({
                username: context.username,
                email: context.email,
                url: context.url
            })
        }

        console.log("Email: ", context.email)

        await new Promise((resolve, reject) => {
            transporter.sendMail(message, (err, info) => {
                if (err) {
                    console.log(err);
                    reject(err)
                } else {
                    resolve(info)
                    console.log(`Info: ${info} -- Email to ${email} from ${process.env.EMAIL_USER} sent successfully!`)
                }
            })
        });

    } catch (error) {
        console.log(error)
    }
}
