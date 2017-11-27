module.exports = db => {
  let Company = db.createModel("Company", {
    companyName: db.type.string().required(),
    logo: db.type.string().required(),
    description: db.type.string(),
    industry: db.type.string()
  });

  return Company;
};
