//import {Sequelize} from "sequelize";


//export const sequelize = new Sequelize('postgres://postgres:admin@localhost:5432/webpipiDB');
 
const { Pool } = require('pg')
 
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
})

pool.connect((err) => {
    if (err) throw err
    console.log("Connect to PostgreSQL successfully!")
})

module.exports = pool










// const {DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT} = require(process.env);
//  console.log(DB_HOST + "nombreee del host de la base de datosss 9jciefnweibvuivbrubvu")
    //  logging: true, // Te menciona en la consola todo los CRUD que hace
   //export const sequelize =  new Sequelize(`postgres://
  // ${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`)

  //  export const sequelize = new Sequelize(`postgres://
  //   postgres:admin@localhost:5432/postgresD`)

// const sequelize = 
//         new Sequelize(
//           'ecommerceDb', 'postgres', 'admin', {
//             host: 'localhost',
//             dialect:'postgres'

//    },
    // {
    //  define :{
    //    freezeTableName: true //todas las tablas usarán el mismo nombre que el nombre del modelo
    //  }
    // }
   //);


//   const sequelize = new Sequelize('sqlite::memory:') // Example for sqlite

