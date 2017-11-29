const nodemailer = require("nodemailer");

const email = (to, subject, html, text) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "gabriel.martin91@gmail.com",
      pass: "DigitalImm0rtal"
    }
  });

  let mailOptions = {
    from: "gabriel.martin91@gmail.com",
    to: to,
    subject: subject,
    html: html,
    text: text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
  });
};

module.exports.newApplication = data => {
  let html = `
        <div>
            <p>Hello, ${data.company} team!</p>
            <p>A new application has been submitted!</p>
            <p> ${
              data.name
            } is interested in joining your team, please review and respond promptly.</p>
            <p>Thanks!</p>
            <p>- Job Placement Team</p>
        </div>
    `;

  let text = `
    Hello, ${data.company} team!
    A new application has been submitted!
    ${data.name} is interested in joining your team.
    Please review their application and respond promptly.

    Thanks!

    - Job Placement Team
`;

  email(data.email, "Welcome!", html, text);
};
