import { Op } from "sequelize";
import Cards from "../database/models/CardsModels.js";
//import Images from "../database/models/imageModels.js"

//Imagen -D:
import fs from "fs";
//import { Console, profile } from "console";


const getCard = async (req, res) =>{
    try {   
        const Productos = await Cards.findAll({});
        res.status(200).json(Productos)
        
    } catch (error) {
        return res.status(400).json(error +"erorrrrr")
    }
};

const searchId = async (req, res) =>{
    try {
        const {id} = req.params;
        const search = await Cards.findByPk(id);
        console.log(search)
        res.status(200).json({ProductoId:search})

    } catch (error) {
        res.json(error)
    }
};

const fsImg = async(req, res)=>{
    const {id}= req.params;
    try {
        const {image} = await Cards.findByPk(id);
    //      const processimage = sharp(image.buffer).resize(800, 200,{
    //                fit:"contain",
    //                background: "red"
    //            });

    //    const imageBuffer = processimage.toBuffer(); //imagen buffer sin el .png
   
   await fs.writeFileSync("imgBufferReesca/prueba.png",image.buffer);
   res.send("yea")
    //     //  console.log(processSizeImage+ "imagenn processimage")
    //    res.json({"imageToBUFFER": imageBuffer, "imageDb": image})

    } catch (error) {
        return(error)
    }
};

const deleteId = async (req, res) =>{
    const { id } = req.params;
    if(!id) throw ("Falta el id");
    try {
        const veriId = await Cards.findOne({ where : {id : id}}); // search en la tabla si el id existe,
        if(veriId){ // si existe DESTROY
            await Cards.destroy({
                where:{ id }
             })
             res.status(200).send("se elimino la card con el id: "+id)
        } else throw Error("no se encontro ese id en la base de datos")
        
        
    } catch (error) {
         res.json({message: error.message})
    }
};


const updating = async (req, res) =>{ // actualizar valores acorde a la db
  try {  
    const {id} = req.params;
    const {name, description, price} = req.body;
 
     const card = await Cards.findByPk(id);
      card.name = name,
      card.description = description,
      card.price = price
      await card.save();

     res.status(200).json({cardUpdating:card})
    
  } catch (error) {
        res.status(400).json({error: error.message})
  }
};

const crearCards = async (req, res) =>{ // multer en file router, crea una imagen en la carpeta seleccionada
    try {
        const { filename } = req.file;
        const {model, description} = req.body;
        res.json(req.file)
        await Cards.create({
            path:"/images/uploads/"+filename,
            model,
            description,
            
        });

       // res.redirect("/upload").send("todo ok")
       // res.sen("todo ok")
    } catch (error) {
        return error
    }
};

 export default {
     getCard,
     fsImg,
     crearCards,
     searchId,
     deleteId,
 }