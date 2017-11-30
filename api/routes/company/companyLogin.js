module.exports = {
  path: "/api/company/login",
  method: "POST",
  config: {
    auth: { mode: "optional" },
    handler: function(request, reply) {
      let { email, password } = request.payload;

      this.models.Company
        .filter({ email: email })
        .then(companys => {
          if (companys.length === 0) {
            throw "Invalid Email/Password Combo";
          }
          let [company] = companys;

          return company.comparePassword(password);
        })
        .then(company => {
          if (!company) {
            throw "Invalid Email/Password Combo";
          }

          delete company.password;

          return company.generateJWT();
        })
        .then(token => reply({ token }))
        .catch(err => {
          console.log(err);
          reply({ err });
        });
    }
  }
};
