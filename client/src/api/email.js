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

const welcome = data => {
  let html = `
        <div>
            <p>Hello, ${data.name}!</p>
            <p>Welcome to !unemployed.</p>
            <p>Congrats on your new job at ${data.company}!</p>
        </div>
    `;

  let text = `
        Hello, ${data.name}!
        Welcome to !unemployed.
        Congrats on your new job at ${data.company}!
`;

  email("isaiahgrey@devtree.io", "Welcome!", html, text);
};

welcome({ name: "Isaiah Grey", company: "G2i Inc" });
