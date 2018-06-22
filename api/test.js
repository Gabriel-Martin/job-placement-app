const { Job } = require("./models");

const JOB_SEEDS = [
  {
    description: "Use our curriculum to teach coding fundementals",
    experience: "1 - 2 years prefered",
    position: "Full-time Instructor",
    payRate: "130/hr DOE"
  },
  {
    description: "Capentry, laying concrete, cleaning up work area, painting",
    experience: "none",
    position: "Manual Laborer",
    payRate: "15/hr"
  },
  {
    description: "Help customers make decisions on purchasing products",
    experience: "none",
    position: "Sales Associate",
    payRate: "12/hr"
  },
  {
    description: "Greet and assist customers.",
    experience: "none",
    position: "Customer Service Rep",
    payRate: "8.50/hr"
  },
  {
    description: "Manage employees and general workflow of the business.",
    experience: "2 -3+ years",
    position: "General Manager",
    payRate: "25/hr DOE"
  },
  {
    description:
      "Deliver product to customers in a timely manner. Provide outstanding customer service.",
    experience: "1 - 2+ prefered",
    position: "Delivery Driver",
    payRate: "9/hr + tips"
  },
  {
    description:
      "Answer incoming phone calls. Schedule appointments. Greet clients upon arrival.",
    experience: "1+ year preferred",
    position: "Office Receptionist",
    payRate: "14/hr DOE"
  },
  {
    description:
      "Keep an excellent record of business expenses, profits money flow.",
    experience: "1 - 2+ years preferred",
    position: "Book-keeper",
    payRate: "28/hr DOE"
  },
  {
    description: "Perform stunts, entertain guests.",
    experience: "1 - 2+ years",
    position: "Profesional Circus Showman",
    payRate: "10/hr DOE"
  },
  {
    description:
      "Lead small teams on complex paint projects. Demonstrate high-level skills in the field.",
    experience: "3 - 4+ years",
    position: "Jouneyman Painter",
    payRate: "30/hr DOE"
  }
];

async function seedDB(counter) {
  if (counter < JOB_SEEDS.length) {
    const newJob = new Job(JOB_SEEDS[counter]);

    await newJob
      .save()
      .then(res => console.log(res))
      .catch(err => console.log(err));

    seedDB(counter + 1);
  }
}

seedDB(0);
