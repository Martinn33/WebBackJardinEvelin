// Uso "type": "module", ES6 usar modulos import y export
import app from "./src/app.js"
//import {sequelize} from "./src/database/database.js"
import  "./src/database/models/CardsModels.js"
import {} from "dotenv/config.js"
const PORT = process.env.PORT
console.log(process.env.PORT)

async function main () {
        try {
            // await sequelize.sync({alter:false}) // force: recrea tablas, alter: altera si es necesario
            // console.log("soy sequelize")
            app.listen(PORT,() => {
                console.log("hola soy appexpress en puerto: " + PORT)
            })
        } catch (error) {
            return({message: error, log:"el error al levantar el server || orm:"})
        }
};

main()



