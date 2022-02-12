const nodemailer = require('nodemailer');
const Email = require('email-templates');

const email = new Email({
  message: {
    from: `${process.env.APP_NAME} support@${process.env.APP_NAME.toLowerCase()}.pro`
  },
  transport: {
    jsonTransport: true
  },
  views: {
    options: {
      extension: 'njk'
    }
  }
});
let transporter;
let from = `${process.env.APP_NAME} support@${process.env.APP_NAME.toLowerCase()}.pro`

module.exports = {
  init () {
    transporter = nodemailer.createTransport({
      host: 'smtp.mailgun.org',
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
      }
    });
  },
  sendMail(template, to, subject, context, callback) {
    let mailOptions = {
      from,
      to,
      subject, 
    };
    email
      .render(template, context)
      .then((html) => {
        let mailOptions = {
          from,
          to,
          subject, 
          html: html
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return cb(error);
          }

          callback();
        });
      })
      .catch(console.error);
  }
}
