module.exports = db => {
  let Applicant = db.createModel("Applicant", {
    firstName: db.type.string().required(),
    lastName: db.type.string().required(),
    password: db.type.string().required(),
    email: db.type.string().required(),
    image: db.type.string()
  });

  return Applicant;
};
