require("dotenv").config();
const { CONNECTION_STRING } = process.env;
2
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
  seed: (req, res) => {
      sequelize
          .query(
              `
      drop table if exists cc_appointments;
      drop table if exists cc_clients;
      drop table if exists cc_users;

      create table cc_users (
          user_id serial primary key, 
          first_name varchar(100), 
          last_name varchar(100), 
          email varchar(50), 
          phone_number varchar(15)
      );

      create table cc_clients (
          client_id serial primary key, 
          user_id integer references cc_users(user_id)
      );

      create table cc_appointments (
          appt_id serial primary key, 
          client_id integer references cc_clients(client_id), 
          date timestamp with time zone, 
          service_type varchar(100), 
          notes text,
          approved boolean, 
          completed boolean
      );
`
          )
          .then(() => {
              console.log("DB seeded!");
              res.sendStatus(200);
          })
          .catch((err) => console.log("error seeding DB", err));
  },
    deleteAppointment: (req, res) => {
  const { id } = req.params;
  sequelize.query(`
  DELETE FROM cc_appointments
  WHERE client_id = ${+id};
`)
    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
},

requestAppointment:(req,res) => {




  const { date, service } = req.body


  sequelize.query(`


    insert into cc_appointments(client_id,date,service_type,notes,approved,completed)


    values(${clientId},'${date}','${service}','picky customer',false,false)


    returning *


  `)


  .then(dbRes => res.status(200).send(dbRes[0]))


  .catch(err => console.log(err))


}
}
