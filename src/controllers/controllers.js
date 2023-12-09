import { Op } from "sequelize";
import Cards from "../database/models/CardsModels.js";
//import Images from "../database/models/imageModels.js"

//Imagen -D:
import fs from "fs";
//import { Console, profile } from "console";



const viewModels = async (req, res) =>{
    const modell = await Cards.getAttributes()
    console.log(modell.model)
    res.json(modell)
};

const getRelojes = async (req, res) =>{
    try {   
        const Productos = await Cards.findAll({});
        res.status(200).json(Productos)
        
    } catch (error) {
        return res.status(400).json(error +"erorrrrr")
    }
};

const createCard = async(req,res) =>{ // se puede mejorar con findOrCreate

    try {

        const {name, description, price}= req.body;
        await Cards.create({
            name,
            description,
            price
        })
        // Cards.save()
        res.status(200).send("se creo la newCard ");

    } catch (error) {
        res.status(404).json({"no se pudo crear, por el error ": error.message})
    }
};

const updateImg  = async(req, res) =>{
     const {ProductoIdid} = req.params;
     const {buffer} = req.file;
    try {
        const a =await Cards.update({ imageBuffer: buffer + ".png"}, {
            where: {
              id: ProductoIdid
            }
          });
    res.status(200).json({message:"Se actualizo la imagen por id de la card", card: a})
    } catch (err){
        console.error(err)
    }
};

const createImg = async(req, res) =>{ // esta de onda no existe 
     const imagen = req.file;
     try {
         const imageBuffer = imagen.buffer;
         await Images.create({
             image: imageBuffer
         })
         res.status(200).json({message:"La imagen se guardo con, Buffer: ", Buffer: imageBuffer});
        
     } catch (error) {
         console.log("erorrr"+ error)
     }
 };

const createImages = async (req, res) =>{ // no funciona
    const {gallery} = req.files;
    res.json(gallery)
    // console.log(gallery)
    //   try {
    //        const a = await gallery.map((file) => {
    //         console.log(file)

    //         //  Images.create({
    //         //      image: file.buffer
    //         //  })
    //        })
    //      res.status(200).json({message: "se cargaron las News ImgBuffers", });
        
    //   } catch (error) {
    //       console.log("erorrr"+ error)
    //   }
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

const deletAll = async (req, res) =>{
    // const {id} = req.params;
    // const finbypk = await Cards.findByPk(id)
    // res.json(finbypk)
    // console.log(finbypk)


};

const buscarYcontar = async (req, res) =>{
    const {name} = req.params;
    try {
        const {count, rows }= await Cards.findAndCountAll({ //rows matriz con los obj q coincidan
            where:{
                name:{
                    [Op.like]: name
                }
            }
        })
        const obj ={
            Array: rows,
            count: count
        }
        res.json(obj)
        
    } catch (error) {
        res.json({ERROR: error})
    }
    
    
};

const updating = async (req, res) =>{
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
     createCard,
     getRelojes,
     createImg,
     fsImg,
     crearCards,
     searchId,
     updateImg,
     deleteId,
 }