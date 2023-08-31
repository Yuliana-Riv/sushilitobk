'use strict'

var nodemailer = require("nodemailer");
var fs = require("fs");
var handlebars = require("handlebars");


class suscribe {
    constructor ( 
       data
    ) {
        this.data = data;
    }

    get subscripcion () {
      return this._subscripcion(this.data);
  }



  _subscripcion(data){
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
    
      readHTMLFile(__dirname + "/views/cuenta/suscripcion.html", function (err, html) {
        var template = handlebars.compile(html);
        var replacements = {
          app: "Boletín",
          email: data,
        };
        var htmlToSend = template(replacements);
        var mailOptions = {
          from: "contacto@somainmobiliaria.com",
          to: data,
          subject: "Subscripción",
          html: htmlToSend,
        };
        transporter.sendMail(mailOptions, function (error, response) {
          if (error) {
            console.log(error);
          }
        });
      });
}
  
}
  module.exports = suscribe; 


