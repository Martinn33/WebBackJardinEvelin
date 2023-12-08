import { Router } from 'express';
import  handler from "../controllers/controllers.js";
import path, {dirname} from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import  {  v4  as  uuidv4  } from 'uuid';
import Cards from "../database/models/CardsModels.js"
//inicial
const __filename= fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = Router();

// MULTER:
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/images/uploads'),
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname))
    }
});
const upload = multer({
     storage,
     dest: path.join(__dirname, '../public/images/uploads'),
     limits: {fileSize: 8000000},
     fileFilter: (req, file, cb) =>{
         const fileTypes = /jpeg|jpg|gif|png/;
         const mimeType = fileTypes.test(file.mimetype);
         const extname = fileTypes.test(path.extname(file.originalname));
         if(mimeType && extname){
             return cb(null, true);
         } cb("Error: el archivo debe ser una imagen valida")
     }
 }).single("image");

// MULTER Route Patch:
 const storageStrategy = multer.memoryStorage();
 const uploadPatch = multer({ storage: storageStrategy }); 
//const cpUpload = upload.fields([{ name: 'Profiles', maxCount: 99}, { name: 'gallery', maxCount: 8 }]) //mas de una imagen

//-------------------------------------------------//

router.get("/upload", (req, res)=>{
    res.render("upload")
});
router.post("/upload",upload, handler.crearCards)

router.get("/",(req,res)=>{ res.send("HOLIII") })
router.get("/productos", handler.getRelojes);
router.post("/crear", handler.createCard);
router.delete("/relojes/:id", handler.deleteId); // params
router.get("/productos/:id", handler.searchId);
// router.delete("/eliminarAll/:id", deletAll);
// router.get("/buscarYcontar/:name", buscarYcontar); // busca y dvuelve 
// router.get("/viewModels",viewModels);
// router.put("/put/:id",updating);

// rutas para jugar con imagenes
//router.post("/imageAdmin/:id",upload.single("image"), handler.createImg);
//router.get("/imageGet/:id", handler.fsImg); // Prueba con Fs resumen: agrega el .png/jpg/etc
router.patch("/actualizarImg/:ProductoIdid",uploadPatch.single("image"), handler.updateImg);//Para actualizar la propieda image de la Db card


router.get("/imagess", async(req,res)=>{ //galeria views index.ejs
    const images = await Cards.findAll();
    res.render('index',  {images} );
  
})


export default router;