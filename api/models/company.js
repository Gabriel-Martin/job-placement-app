const bcrypt = require("bcrypt-as-promised");
const jwt = require("jsonwebtoken");

module.exports = db => {
  let Company = db.createModel("Company", {
    companyName: db.type.string().required(),
    email: db.type.string().required(),
    password: db.type.string().required(),
    logo: db.type.string().required(),
    description: db.type.string(),
    industry: db.type.string()
  });

  Company.define("generatePassword", function() {
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(this.password, salt))
      .then(hash => Object.assign(this, { password: hash }))
      .catch(err => console.log(err));
  });

  Company.define("comparePassword", function(password) {
    return bcrypt
      .compare(password, this.password)
      .then(authed => (authed ? this : false))
      .catch(bcrypt.MISMATCH_ERROR, () => "Invalid Email/Password Combo")
      .catch(err => console.log(err));
  });

  Company.define("generateJWT", function() {
    return jwt.sign(Object.assign({}, this), supersecretsecret, {
      algorithm: "HS256"
    });
  });

  Company.pre("save", function(next) {
    Company.filter({ email: this.email }).then(companies => {
      if (companies.length > 0) {
        return next("Invalid Email/Password Combo");
      }
      return this.generatePassword()
        .then(() => next())
        .catch(err => next(err));
    });
  });

  return Company;
};
