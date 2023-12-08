// Uso "type": "module", ES6 usar modulos import y export
import app from "./src/app.js";
import {sequelize} from "./src/database/database.js";
import  "./src/database/models/CardsModels.js"

async function main () {
        try {
            await sequelize.sync({alter:false}) // force: recrea tablas, alter: altera si es necesario
            console.log("soy sequelize")
            app.listen(3001,() => {
                console.log("hola soy appexpress")
            })
        } catch (error) {
            return({message: error, log:"el error al levantar el server || orm:"})
        }
};

main()



