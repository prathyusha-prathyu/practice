var express=require("express");
var bodyParser=require("body-parser");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydb');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
console.log("connection succeeded");
})
var app=express()
app.use(bodyParser.json());
app.use(express.static('/public'));
app.use(bodyParser.urlencoded({
extended: true
}));
app.post('/sign_up', function(req,res){
var name = req.body.name;
var id =req.body.id;
var data = {
"name": name,
"id":id
}
const customer = {
    id: data.length + 1,
    title: req.body.name
    };
db.collection('details').insertOne(data,function(err, collection){
if (err) throw err;
console.log("Record inserted Successfully");
});
return res.redirect('signup_success.html');
});
app.get('/', function (req, res) {
res.sendFile( __dirname + "/" + "index.html" );
})
app.get('/signup_success.html', function (req, res) {
res.sendFile( __dirname + "/" + "signup_success.html" );
})



app.listen(3000)
console.log("server listening at port 3000"); 