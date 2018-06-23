const { Job } = require("./models");
const { Company } = require("./models");
const { Applicant } = require("./models");

const SEED_DATA = [
  {
    company: {
      companyName: "Code School",
      email: "codeschool@email.com",
      password: "123"
    },
    job: {
      description: "Use our curriculum to teach coding fundementals",
      experience: "1 - 2 years prefered",
      position: "Full-time Instructor",
      payRate: "130/hr DOE"
    }
  },
  {
    company: {
      companyName: "Carpentry Guys",
      email: "carpentryguys@email.com",
      password: "123"
    },
    job: {
      description: "Capentry, laying concrete, cleaning up work area, painting",
      experience: "none",
      position: "Manual Laborer",
      payRate: "15/hr"
    }
  },
  {
    company: {
      companyName: "Your Sale",
      email: "yoursale@email.com",
      password: "123"
    },
    job: {
      description: "Help customers make decisions on purchasing products",
      experience: "none",
      position: "Sales Associate",
      payRate: "12/hr"
    }
  },
  {
    company: {
      companyName: "Customers R Us",
      email: "customersrus@email.com",
      password: "123"
    },
    job: {
      description: "Greet and assist customers.",
      experience: "none",
      position: "Customer Service Rep",
      payRate: "8.50/hr"
    }
  },
  {
    company: {
      companyName: "My Little Shop",
      email: "mylittleshop@email.com",
      password: "123"
    },
    job: {
      description: "Manage employees and general workflow of the business.",
      experience: "2 -3+ years",
      position: "General Manager",
      payRate: "25/hr DOE"
    }
  },
  {
    company: {
      companyName: "Bob's Pizza Joint",
      email: "bobspizzajoint@email.com",
      password: "123"
    },
    job: {
      description:
        "Deliver product to customers in a timely manner. Provide outstanding customer service.",
      experience: "1 - 2+ prefered",
      position: "Delivery Driver",
      payRate: "9/hr + tips"
    }
  },
  {
    company: {
      companyName: "Lawsuits 2 Go",
      email: "lawsuits2go@email.com",
      password: "123"
    },
    job: {
      description:
        "Answer incoming phone calls. Schedule appointments. Greet clients upon arrival.",
      experience: "1+ year preferred",
      position: "Office Receptionist",
      payRate: "14/hr DOE"
    }
  },
  {
    company: {
      companyName: "Get Paid Inc",
      email: "getpaidinc@email.com",
      password: "123"
    },
    job: {
      description:
        "Keep an excellent record of business expenses, profits money flow.",
      experience: "1 - 2+ years preferred",
      position: "Book-keeper",
      payRate: "28/hr DOE"
    }
  },
  {
    company: {
      companyName: "CircaWay",
      email: "circaway@email.com",
      password: "123"
    },
    job: {
      description: "Perform stunts, entertain guests.",
      experience: "1 - 2+ years",
      position: "Profesional Circus Showman",
      payRate: "10/hr DOE"
    }
  },
  {
    company: {
      companyName: "Painter Pros",
      email: "painterpros@email.com",
      password: "123"
    },
    job: {
      description:
        "Lead small teams on complex paint projects. Demonstrate high-level skills in the field.",
      experience: "3 - 4+ years",
      position: "Jouneyman Painter",
      payRate: "30/hr DOE"
    }
  },
  {
    firstName: "Jon",
    lastName: "Doe",
    password: "123",
    email: "jondoe@email.com"
  }
];

function seedDB() {
  SEED_DATA.map(async entity => {
    if (entity.firstName) {
      const NEW_APPLICANT = new Applicant(entity);

      await NEW_APPLICANT.save()
        .then(applicant => console.log(applicant))
        .catch(err => console.log(err));
    }

    let companyId = "";
    if (entity.company) {
      const NEW_COMPANY = new Company(entity.company);

      await NEW_COMPANY.save()
        .then(company => {
          companyId = company.id;
          console.log(company);
        })
        .catch(err => console.log(err));
    }

    if (entity.job) {
      let newJob = new Job(entity.job);

      newJob.companyId = companyId;

      await newJob
        .save()
        .then(job => console.log(job))
        .catch(err => console.log(err));
    }
  });
}

seedDB();
