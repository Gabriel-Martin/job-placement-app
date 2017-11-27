const bcrypt = require("bcrypt-as-promised");

module.exports = db => {
  let Company = db.createModel("Company", {
    companyName: db.type.string().required(),
    email: db.type.string().required(),
    password: db.type.string().required(),
    logo: db.type.string(),
    description: db.type.string(),
    industry: db.type.string()
  });

  return Company;
};
