const express = require('express');
const app = express();
const multipart = require('connect-multiparty');
const cloudinary = require('cloudinary');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const multipartMiddleware = multipart();

cloudinary.config({
    cloud_name: 'hrithik',
    api_key: '135272241391855',
    api_secret: 'ngZCJWapvrrYd0W_zxkE_qKfquw'
});

app.get("/",function(req,res){
    res.render("home.ejs");
})

app.post('/upload', multipartMiddleware, function(req, res) {
    var image=req.body.image;
    cloudinary.v2.uploader.upload(image,
      {
        ocr: "adv_ocr"
      }, function(error, result) {
          if( result.info.ocr.adv_ocr.status === "complete" ) {
              res.render("show.ejs",{result:result,image:image});
            // res.send(result.info.ocr.adv_ocr.data[0].textAnnotations[0].description);
          }
      });
  });


  app.listen(3300,function(){
      console.log("server has started");
  })