module.exports = db => {
  let Job = db.createModel("Job", {
    description: db.type.string().required(),
    experience: db.type.string().required(),
    position: db.type.string().required(),
    payRate: db.type.string().required()
  });

  return Job;
};
