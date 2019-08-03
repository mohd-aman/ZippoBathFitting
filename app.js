var express = require('express');
var request = require('request');
var ejs = require('ejs');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var exphbs = require('express-handlebars');
var app = express();

app.engine('handlebars',exphbs());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'vendor')));



//body-parser
app.use(bodyParser.urlencoded({
  extended:false
}));
app.use(bodyParser.json());


app.get('/', function(req, res){
	res.render("home");
});

app.get('/contact',(req,res) =>{
  res.render("contact");
});

app.get('/about-us',(req,res)=>{
  res.render("about-us");
});

//our products page and it's redirecting pages
app.get('/our-products',(req,res)=>{
  res.render('our-products');
});

app.get('/warranty',(req,res) =>{
  res.render("warranty");
});

app.get('/our-products/bib-cock',(req,res)=>{
  res.render('bib-cock');
});

app.get('/our-products/wall-mixer',(req,res)=>{
  res.render('wall-mixer');
});

app.get('/our-products/angle-concealed-cock',(req,res)=>{
  res.render('angle-concealed-cock');
});

app.get('/our-products/sink-cock',(req,res)=>{
  res.render('sink-cock');
});

app.get('/our-products/pillar-cock',(req,res)=>{
  res.render('pillar-cock');
});

app.get('/our-products/sink-mixer',(req,res)=>{
  res.render('sink-mixer');
});

app.post('/send',(req,res) => {
  // async..await is not allowed in global scope, must use a wrapper
async function main(){

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'zippobath@gmail.com', // generated ethereal user
      pass: 'zippo@99' // generated ethereal password
    },
    tls:{
    	rejectUnauthorized:false
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Zipp-Bath-Fitting Contact" <zippobath@gmail.com>', // sender address
    to: "zippobathfitting980@gmail.com", // list of receivers
     subject: `${req.body.name}`,
    replyTo: `${req.body.email}`,
    html:`<p>You have new contact request from Zippo-Bath-Fitting Web</p><h3>Contact Detail</h3><ul><li>Name : ${req.body.name}</li><li>Email : ${req.body.email}</li><li>Subject : ${req.body.subject}</li></ul><h3>Message</h3>${req.body.message}`,
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com
  res.render('contact');
   res.end();

}
main().catch(console.error);
});




app.listen(3000,(req,res) => {
	console.log('App on 3000');
});
