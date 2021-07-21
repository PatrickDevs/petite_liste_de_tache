const express                               = require("express");
const app                                   = express();
const cookieParser                          = require("cookie-parser");
const bodyParser                            = require("body-parser"); 
//const session                               = require("express-session");
const librairieFront                        = require("./librairie/libAccess");
const ctrl_1                                = require("./controleur/controle_1");
const manipulation_baseDeDonne              = require("./controleur/controle_2");
const cors                                  = require("cors");
require("./dbConfig");


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser());
app.use(express.urlencoded({extended:true}));
app.use(cors());

/**Appel aux routes externes*/

    /**Appel aux librairie css, js */
    app.use("/front", librairieFront );

    /**Appel du fichier controle_1 */
    app.use("/", ctrl_1);

    /**Appel des url pour ajouter, modifier, suprimer, recuperer des donnees dans la db  */
    app.use("/back", manipulation_baseDeDonne);


/**PORT DE DEMARRAGE DU SERVEUR */
app.listen(55401, () => console.log("Server sTarted in the port : 55401"));
