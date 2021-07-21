const mongoose      = require("mongoose");

const TacheEnregistrerSchema = new mongoose.Schema(
    {
        titre_de_la_tache: {
            type:String,
            require: true,
        },
        date:{
            type:Date,
            default:Date.now,
        },
    }
);

const TacheEnregistrerModel = mongoose.model( "tacheenregistrermodels", TacheEnregistrerSchema );

module.exports = {TacheEnregistrerModel};