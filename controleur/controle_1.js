const express                   = require("express");
const app                       = express();
const cookieParser              = require("cookie-parser");
const bodyParser                = require("body-parser"); 
const session                   = require("express-session");



/**On utilise les cookies, les sessions et les formulaires */
app.use(cookieParser());
app.use(bodyParser());
app.use(session({secret:'todotopsecret'}));


/**S'il n'y pas de 'todolist' dans la session ,
 * on en creer une vide sous forme de tableau avant la suite
 */
 app.use(function(req, res, next){
    if( typeof(req.session.todolist)  == "undefined" ){
        req.session.todolist = [];
    }
    next();
})


/**On affiche la todolist et le formulaire */
app.get("/todo", function(req, res) {
    res.render( "todo.ejs", {todolist: req.session.todolist} );
} )

/**On ajoute un element a la todolist */
app.post("/todo/ajouter/", function(req, res) {
    if(req.body.newtodo != ""){
        req.session.todolist.push(req.body.newtodo);
    }
    res.redirect("/todo");
})


/**Supprime un element de la todolist */
app.get("/todo/supprimer/:id", function(req, res){
    if(req.params.id != ""){
        req.session.todolist.splice(req.params.id, 1);
    }
    res.redirect("/todo");
});

/**Vider le tableau */
app.get("/todo/vider", function(req, res){
    req.session.todolist.splice(0, req.session.todolist.length);
    res.redirect("/todo");
})

/* 
//On redirige vers la todolist si la page demande n'est pas trouver 
app.use(function(req, res, next){
    res.redirect("/todo");
}); */


module.exports = app;

/**CE CODE MA INSPIRER: IL PERMET DE VIDER UN TABLEAU */
/* Arr1.splice(0, Arr1.length);
console.log(Arr1); */