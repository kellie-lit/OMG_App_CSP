require("dotenv").config();
const { CONNECTION_STRING } = process.env;

const Sequelize = require("sequelize");

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = {
  seed: (_req, res) => {
    sequelize.query(`

            create table packages (
                package_id serial primary key, package_name varchar, 
                package_details varchar
            );

            create table consultations (
                consult_id serial primary key,
                consult_name varchar,
                c_phone int,
                c_email varchar, c_date date,
                c_time timestamp,
                package_select int references packages(package_id)

            );
            
            insert into packages (package_name)
            values ('O.M.G. TO MOVEMENT'),
            ('O.M.G. TO FITNESS'),
            ('O.M.G. TO LIFE');
        `).then(() => {
      console.log('DB seeded!')
      res.sendStatus(200)
    }).catch(err => console.log('error seeding DB', err))
  },


  getPackages: (_req, res) => {
    sequelize
      .query(
        `
        SELECT * FROM packages
      `
      )
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  },
    createConsultation: (req, res) => {
      const { c_name, c_phone, c_email, c_date, c_time } = req.body;
      sequelize
        .query(
          `
        INSERT into consultation(c_name, c_phone,c_email, c_date, c_time)
        values('${c_name}',${c_phone},${c_email}, ${c_date}, ${c_time});
      `
        )
        .then((dbRes) => res.status(200).send(dbRes[0]))
        .catch((err) => console.log(err));
    },
      deleteConsultation: (req, res) => {
        const { id } = req.params;
        sequelize.query(`
        DELETE FROM consultation
        WHERE consult_id = ${+id};
    `)
          .then(dbRes => res.status(200).send(dbRes[0]))
          .catch(err => console.log(err))
      }
    }