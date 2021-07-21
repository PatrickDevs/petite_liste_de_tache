const mongoose  = require("mongoose");



mongoose.connect("mongodb://127.0.0.1:27017/liste_de_tache",

    {userNewUrlParser:true, useUnifiedTopology:true},
    (err) => {
        if(!err){
            console.log("Connection etablie");
        } else {
            console.log("Connection Non etablie: " + err);
        }
    }

);


