const express                   = require("express");
const app                       = express();
const cookieParser              = require("cookie-parser");
const bodyParser                = require("body-parser"); 
const session                   = require("express-session");
const { ObjectID, ObjectId }    = require("mongodb");
const {TacheEnregistrerModel}   = require("../model/schemaDeDonne_tache");


/* ****************************************************************************** */
/* *-----------------------------BASE DE DONNE----------------------------------* */
/* ****************************************************************************** */


/**Recuperation des donnees */
app.get("/recuperation_dans_db", (req, res) => {
    TacheEnregistrerModel.find((err, docs) => {
        if(!err){
            res.send(docs);
        } else {
            console.log("Erreur detecter dans le fichier 'controle_2'")
            console.log("Message de 'controle_2' -> Recuperation des donnees impossible: " + err);
        }
    } );
})


/* 
/**On ajoute un element a la todolist 

app.post("/todo/ajouter/", function(req, res) {
    if(req.body.newtodo != ""){
        req.session.todolist.push(req.body.newtodo);
    }
    res.redirect("/todo");
})
*/


/**Ajouts des donnees dans mongoDB */
app.post("/ajout_dans_db", (req, res) => {

    const newData = new TacheEnregistrerModel({
        titre_de_la_tache: req.body.titre_de_la_tache,
    });

    newData.save((err, docs) => {
        if(!err){
            res.send(docs);
        } else {
            res.send(err);
            console.log("Erreur detecter dans le fichier 'controle_2'");
            console.log("Message de 'controle_2' -> Enregistrement des donnes impossible: "+err);
        };
    });

} );


//**Modifier des donnees enregistrer */
app.put("/:id", (req, res) => {

    if( !ObjectID.isValid(req.params.id) ) {
        return res.status(400).send("Erreur d'identifiant: " + req.params.id);
    } else {
        const modifierData = {
            titre_de_la_tache: req.body.titre_de_la_tache,
        }

        TacheEnregistrerModel.findByIdAndUpdate( 
            req.params.id,
            { $set:modifierData },
            { new:true },
            (err, docs) => {
                if(!err){
                    res.send(docs);
                } else {
                    console.log("Erreur detecter dans le fichier 'controle_2'")
                    console.log("Message de 'controle_2' -> Erreur de modification: " + err);
                }
            }
        )
    }
    
} );


/**Suprime des donnees dans la db */
app.delete("/:id", (req, res) => {
    if( !ObjectId.isValid(req.params.id) ) {
        return res.status(400).send("Erreur d'identifiant: " + req.params.id);
    }

    TacheEnregistrerModel.findOneAndRemove( req.params.id, (req, docs) => {
        if(!err) {
            res.send(docs);
        } else {
            console.log("Erreur detecter dans le fichier 'controle_2'")
            console.log("Message de 'controle_2' -> Erreur de supression: " + err );
        }
    } )
} )



module.exports = app;