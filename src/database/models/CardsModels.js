import { DataTypes } from 'sequelize';
import {sequelize} from '../database.js';
//import Images from "./imageModels.js"

const Cards = sequelize.define(
    'cards', {
    id: {
        type: DataTypes.INTEGER,
        // defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        autoIncrement: true
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false
    },

    model: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    description: {
        type: DataTypes.STRING,
        allowNull: false
    },

}, { timestamps: false }

);

export default Cards;
/*class Cards extends Model {
    static init(sequelize){
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                //defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                autoIncrement: true
            },
        
            filename: {
                type: DataTypes.STRING,
                allowNull: true
            },
        
            originalname: {
                type: DataTypes.STRING,
                allowNull: true
            },
        
            destination: {
                type: DataTypes.STRING,
                allowNull: true
            },
            image: {
                type: DataTypes.BLOB,
                allowNull: true
            },
            path: {
                type: DataTypes.STRING,
                allowNull: true
            },
            size: {
                type: DataTypes.NUMBER,
                allowNull: true
            },
        
            
         })
    }

 }*/

// Cards.init({
//     id: {
//              defaultValue: DataTypes.UUIDV4,
//              primaryKey: true,
//              type: DataTypes.UUID,
//              autoIncrement: true,
//          },
//          name :{
//              type: DataTypes.STRING
//          },
//         //  description :{
//         //      type: DataTypes.STRING
//         //  },
//         //  price: {
//         //      type: DataTypes.STRING
//         //  },

// }, { sequelize });
// console.log(sequelize+"dmeinfineinfienienfiNNI")
// console.log(Cards === sequelize.models.Cards); // true

// const jane = await Cards.create({ name: "Jane" });
// console.log(jane.name); // "Jane"
// // jane.name = "Ada";
// // // the name is still "Jane" in the database
// // await jane.save();
// // // Now the name was updated to "Ada" in the database!


// // Jane exists in the database now!
// // console.log(jane instanceof User); // true
// // console.log(jane.name); // "Jane"

//  console.log(sequelize.models.Cards, "gkojgogoalllllñ"); // true






//   Cards.hasOne(Images, {
//       foreignKey: 'CardsId',
//       sourceKey: 'id',
//       type: DataTypes.UUID   
//     })
//   Images.belongsTo(Cards)




//  cards.hasMany(imageDatos,{ // relacion de uno a muchos (un proyecto tiene muchas tareas)
//      foreignKey: 'proyectId',    
//      sourceKey: 'id'
//  }) 

//  imageDatos.belongsTo(cards,{ 
//      foreignKey: 'proyectId',
//      targetid: 'id'
//  })