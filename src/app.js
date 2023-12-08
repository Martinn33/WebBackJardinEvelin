// Uso "type": "module", ES6 usar modulos import y export
import express, { json } from "express";
import router from "./routes/routes.js";
 import ejs from "ejs" // express tiene una integracion con ejs, esta parte la puedo borrar si quiero
import morgan from "morgan";
import { fileURLToPath } from "url";
import path,{dirname} from "path"
//import cors from "../../front-end/src/public";

//Obtener la ruta actual de este archivo:
const __filename= fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initializations
const app = express();

//Settings:
app.set("views", path.join(__dirname, 'views') );
app.set("view engine", "ejs");

//Middlewars:
app.use(json()); // cada ves que envien un json el servidor lo va a poder interpretar y guardar en req.body
app.use(morgan('dev'));   
//app.use(express.urlencoded({extended : true}));//para ententer los multiples inputs
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
       'Access-Control-Allow-Headers',
       'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header(
       'Access-Control-Allow-Methods',
       'GET, POST, OPTIONS, PUT, DELETE'
    );
    next();
  });

// Static files
app.use(express.static(path.join(__dirname, 'public')));
//path.join(__dirname, 'public')
//Rutas:
app.use(router);

export default app;

