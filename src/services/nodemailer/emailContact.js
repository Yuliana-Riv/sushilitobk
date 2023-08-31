'use strict'

var nodemailer = require("nodemailer");
var fs = require("fs");
var handlebars = require("handlebars");


class emailContact {
    constructor ( 
       data
    ) {
        this.data = data;
    }

    // Getters

    get  contacto(){
      return this._contacto(this.data);
    }

    get  contactoUser(){
      return this._contactoUser(this.data);
    }

   /* get  contactoEnvio(){
      return this._contactoEnvio(this.data);
    }
*/




   _contacto(data){
    var readHTMLFile = function (path, callback) {
        fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
          if (err) {
            throw err;
          } else {
            callback(null, html);
          }
        });
      };
    
      // Definimos el transporter
      var transporter = nodemailer.createTransport({
        host: "somainmobiliaria.com",
      port: 465,
      secure: true,
      auth: {
        user: "contacto@somainmobiliaria.com",
        pass: "vgl^_)Yvs5Mw",
      },
      });

      transporter.verify(function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log("Server is ready to take our messages");
        }
      });
     
  
      readHTMLFile(__dirname + "/views/contacto/contacto.html", function (err, html) {
        var template = handlebars.compile(html);
        var replacements = {
          app: 'AppWeb',
          data:data
        };
        var htmlToSend = template(replacements);
        var mailOptions = {
        from: "contacto@somainmobiliaria.com",
        to: 'jlvh1996@gmail.com', // jlvh1996@gmail.com contacto@somainmobiliaria.com
        subject: "Contacto desde", // 
        html:htmlToSend,
      };

      
      transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
          console.log(error);
        }});
      });
   }


   _contactoUser(data) {
    var readHTMLFile = function (path, callback) {
      fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
        if (err) {
          throw err;
        } else {
          callback(null, html);
        }
      });
    };

    // Definimos el transporter
    var transporter = nodemailer.createTransport({
      host: "somainmobiliaria.com",
      port: 465,
      secure: true,
      auth: {
        user: "contacto@somainmobiliaria.com",
        pass: "vgl^_)Yvs5Mw",
      },
    });

    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log("Server is ready to take our messages");
      }
    });

    readHTMLFile(__dirname + "/views/contacto/contactoUser.html", function (err, html) {
      var template = handlebars.compile(html);
      var replacements = {
        app: "AppWeb",
        data: data,
      };
      var htmlToSend = template(replacements);
      var mailOptions = {
        from: "contacto@somainmobiliaria.com",
        to: data.email,
        subject: "¡Bienvenido!",
        html: htmlToSend,
      };
      transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
          console.log(error);
        }
      });
    });
  }







  _contactoMedio(data){
      var readHTMLFile = function (path, callback) {
        fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
          if (err) {
            throw err;
          } else {
            callback(null, html);
          }
        });
      };
    
      // Definimos el transporter
      var transporter = nodemailer.createTransport({
        host: "somainmobiliaria.com",
      port: 465,
      secure: true,
      auth: {
        user: "contacto@somainmobiliaria.com",
        pass: "vgl^_)Yvs5Mw",
      },
      });

      transporter.verify(function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log("Server is ready to take our messages");
        }
      });
     
  
      readHTMLFile(__dirname + "/views/contactoMedio.html", function (err, html) {
        var template = handlebars.compile(html);
        var replacements = {
          app: 'AppWeb',
          data:data
        };
        var htmlToSend = template(replacements);
        var mailOptions = {
        from: "contacto@somainmobiliaria.com",
        to: data.email, 
        subject: "Contacto ", // cambiar
        html:htmlToSend,
      };

      
      transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
          console.log(error);
        }
      });
      });
   }

   
   

    
}
  module.exports = emailContact; 


