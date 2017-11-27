module.exports = db => {
  let Application = db.createModel("Application", {
    firstName: db.type.string().required(),
    lastName: db.type.string().required(),
    address: db.type.string().required(),
    city: db.type.string().required(),
    state: db.type.string().required(),
    zip: db.type.string().required(),
    phone: db.type.string().required(),
    email: db.type.string().required(),
    date: db.type.string().required(),
    eductaion: db.type
      .string()
      .enum("highschool", "GED", "college")
      .required(),
    applicationStatus: db.type
      .string()
      .enum("pending", "hired", "declined")
      .required()
  });

  return Application;
};
