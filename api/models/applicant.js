const bcrypt = require("bcrypt-as-promised");
const JWT = require("jsonwebtoken");
module.exports = db => {
  let Applicant = db.createModel("Applicant", {
    firstName: db.type.string().required(),
    lastName: db.type.string().required(),
    password: db.type.string().required(),
    email: db.type.string().required(),
    image: db.type.string()
  });

  Applicant.define("generatePassword", function() {
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(this.password, salt))
      .then(hash => Object.assign(this, { password: hash }))
      .catch(error => error);
  });

  Applicant.define("comparePassword", function(password) {
    return bcrypt
      .compare(password, this.password)
      .then(authed => (authed ? this : false))
      .catch(error => error);
  });

  Applicant.define("generateJWT", function(applicant) {
    return JWT.sign(Object.assign({}, this), "supersecretsecret", {
      algorithm: "HS256"
    });
  });

  Applicant.pre("save", function(next) {
    Applicant.filter({ email: this.email }).then(applicant => {
      if (applicant.length > 0) {
        return next("email/password combo invalid");
      } else {
        return this.generatePassword()
          .then(() => next())
          .catch(error => next(error));
      }
    });
  });

  return Applicant;
};
