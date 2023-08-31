"use strict"
var colaboradorModel =require( "./model");
var colaboradorRepo = require("./repo");

var bcrypt = require('bcrypt');
var fs = require("fs");
var path = require('path')


const webp=require('webp-converter');

let validService = require("../../services/validator/validateParams")


const controller = {
 
  getAll: async  (req, res) => {
    const _repo = new colaboradorRepo();
    const _model = new colaboradorModel( _repo);
 


    /*let payload = req.user
    const validate = new validService()
    let validAdm = validate.validAdmCol(payload.role)

    /*if(payload == undefined || payload ==''){
      return res.status(200).send({
        status: 'error',
        message: 'Faltan datos.',
       
      });
    }

    if(!validAdm){
      return res.status(200).send({
        status: 'error',
        message: 'Datos no validos.',
        
      });
    }*/
    let result =[]
    let items = await _model.getAll();
    let status ='success'
    let message ='success'

   
     if(Array.isArray(items)){
        let newarr =[]
        for (const item of items) {
            delete item.pass
            newarr.push(item);
        }
        result = newarr
     }else{
        status ='error'
        message = items;
     }

    return res.status(200).send({
        status:status,
        message: message,
        result: result,
       
    });
    
  },

  getById: async  (req, res) => {
    const _repo = new colaboradorRepo();
    const _model = new colaboradorModel( _repo);



 
    let result=[];
    let status;
    let message='Colaborador encontrado.'

    /*let payload = req.user
    const validate = new validService()
    let validAdm = validate.validAdmCol(payload.role)

    if(payload == undefined || payload ==''){
      return res.status(200).send({
        status: 'error',
        message: 'Faltan datos.',
       
      });
    }

    if(!validAdm){
      return res.status(200).send({
        status: 'error',
        message: 'Datos no validos.',
      
      });
    }*/


    const id = req.params.id;
    let validid = validate.validNum(id)
    if(!validid){
        return res.status(200).send({
          status: 'error',
          message: 'Tipo de dato no valido.',
        
        });
      }
  


    let item = await _model.getById(id);
   


    if(item.id){
      delete item.pass
      status = 'success'
      result = item
    }else{
      status = 'error'
      message = item
    }
     
    return res.status(200).send({
      status: status,
      message: message,
      result: result
    });
  },

 



  create: async (req, res) => {
    
    const _repo = new colaboradorRepo();
    const _model = new colaboradorModel( _repo);
    let {email, pass , name , lastname ,  phone ,  wlink } = req.body
    let payload = req.user

    
  
    let status ='success';
    let message ='Colaborador creado con exito.'
    let result =''

    const validate = new validService()


    let validAdm = validate.validAdmCol(payload.role)


    if(payload == undefined || payload ==''){
      return res.status(200).send({
        status: 'error',
        message: 'Faltan datos.',
        result:result
      });
    }

    if(!validAdm){
      return res.status(200).send({
        status: 'error',
        message: 'Datos no validos.',
        result:result
      });
    }



   
    let validName = validate.validParam(name)
    let validLN = validate.validParam(lastname)
    let validEmail = validate.validEmail(email)
    let validPass = validate.validPass(pass)
    let validwlink = validate.validParam(wlink)
    let validphone = validate.validPhone(phone)


    if(!validName || !validLN ){ 
      return res.status(200).send({
        status: 'error',
        message: 'Datos no validos.',
        result:result
      });
    }
    if( !validwlink){ 
      return res.status(200).send({
        status: 'error',
        message: 'Whatsapp link no valido.',
        result:result
      });
    }
    if( !validphone ){ 
      return res.status(200).send({
        status: 'error',
        message: 'Telefono no valido.',
        result:result
      });
    }

    if(!validEmail ){
      return res.status(200).send({
        status: 'error',
        message: 'Email no valido.',
        result:result
      });
    }



    if(!validPass ){
      return res.status(200).send({
        status: 'error',
        message: 'Contraseña no valida (8 ctrs min.).',
        result:result
      });
    }

    

    // Todo correcto
      bcrypt.hash(pass, 10, async function(err, hash) {
      if(err) {
        console.error(err)
      }


       result = await _model.create({email, pass:hash , name , lastname ,  phone ,  wlink});
       let added ='_'
   
      if(result != 'success'){
        status='error'
        message=result
      }else{
          added = await _model.last()
          added.id ?  delete added.pass : added = {}
      }

      
      
      return res.status(200).send({
          message:message,
          status:status,
          result:result,
          added:added
      });
  });
  

  },

  update: async(req, res) =>{
    const _repo = new colaboradorRepo();
    const _model = new colaboradorModel( _repo);

    let {id,email, pass , name , lastname , phone , wlink }  = req.body

    let message='Colaborador actualizado con exito.'
    let result =''


    const validate = new validService()

    let payload = req.user
    let validAdm = validate.validAdmCol(payload.role)


    if(payload == undefined || payload ==''){
      return res.status(200).send({
        status: 'error',
        message: 'Faltan datos.',
        result:result
      });
    }

    if(!validAdm){
      return res.status(200).send({
        status: 'error',
        message: 'Datos no validos.',
        result:result
      });
    }

    let validId = validate.validNum(id)

    if(!validId ){
      return res.status(200).send({
        status: 'error',
        message: 'Tipo de dato no valido.',
        result:result
      });
    }

    let getById = await _model.getById(id);

  
    //validar datos
    if(!getById.id){
      return res.status(200).send({
        status: 'error',
        message: 'Colaborador no encontrado.',
        result:result
      });
    }

    let validName = validate.validParam(name)
    let validLN = validate.validParam(lastname)
    let validEmail = validate.validEmail(email)
    let validPass = validate.validPass(pass)
    let validPhone = validate.validPhone(phone)
    let validwlink = validate.validParam(wlink)

    


    !validPass ? pass = getById.pass : pass 
    !validName ? name = getById.name : name 
    !validLN ? lastname = getById.lastname : lastname 
    !validEmail ? email = getById.email : email 
    !validPhone ? phone = getById.phone : phone 
    !validwlink ? wlink = getById.wlink : wlink 

    


   
   
      if(validPass){

        bcrypt.hash(pass, 10, async function(err, hash) {
          if(err) {
            console.error(err)
          }
           id = parseInt(id);

          let item={id,email, pass:hash , name , lastname ,  phone , wlink }
          
  
          result = await _model.update(item);

          let status ='success';
          if(result != 'success'){
            status='error'
            message =result
          }
         
          return res.status(200).send({
              message:message,
              status:status
             
          });
      });

      }else{


        let item={id,email, pass , name , lastname ,  phone , wlink }
       
        result = await _model.update(item);
        let status ='success';
        if(result != 'success'){
          status='error'
          message =result
        }
        return res.status(200).send({
            message:message,
            status:status
        });

      }
  

      
  },


  delete: async  (req, res) => {
    const _repo = new colaboradorRepo();
    const _model = new colaboradorModel( _repo);
    const {id} = req.body;

    let payload = req.user
    const validate = new validService()
    let validAdm = validate.validAdm(payload.role)

    if(payload == undefined || payload ==''){
      return res.status(200).send({
        status: 'error',
        message: 'Faltan datos.',
      
      });
    }

    if(!validAdm){
      return res.status(200).send({
        status: 'error',
        message: 'Datos no validos.',
       
      });
    }
   
   
    let validid = validate.validNum(id)
 
    if(!validid){
      return res.status(200).send({
        status: 'error',
        message: 'Tipo de dato no valido.',
       
      });
    }

    let item = await _model.getById(id);
    if(!item.id){
      return res.status(200).send({
        status: 'error',
        message: 'Registro no valido',
      });
    }

    //obtener imagenes de los terrenos
    let terrenosfotos = await _model.getAllFotosTerrenos(id)
    //obtener imagenes de las oficinas
    let oficinasfotos = await _model.getAllFotosOficinas(id)
    //obtener imagenes de los locales
    let localesfotos = await _model.getAllFotosLocales(id)
    //obtener imagenes de las casas
    let casasfotos = await _model.getAllFotosCasas(id)

   

    let result = await _model.delete(id);
    let message;
    let status ='success';
    
    if(result =='success'){
      message ='Colaborador eliminado'

      let img = item.image
      if( img != '' && img != null && img != undefined){
        let splitimg = img.split('.')
        let nimg = splitimg[0]
        nimg = nimg+'.webp'
    
        //let filePath2 = 'uploads\\colaborador\\'+nimg
          let filePath2 = 'uploads/colaborador/'+nimg   //! linux
        fs.unlink(filePath2, (err) => {/* console.log(err)*/})
    
       // let filePath = 'uploads\\colaborador\\'+img
        let filePath = 'uploads/colaborador/'+img  //! linux
        fs.unlink(filePath, (err) => {/* console.log(err)*/})
      }


      //todo eliminar fotos de los terrenos.
      if(Array.isArray(terrenosfotos)){
        for (const data of terrenosfotos) {
            let img = data.image
            if(img){
                let splitimg = img.split('.')
                let nimg = splitimg[0]
                nimg = nimg+'.webp'
            
                //let filePath2 = 'uploads\\terrenos\\'+nimg
                  let filePath2 = 'uploads/terrenos/'+nimg   //! linux
                fs.unlink(filePath2, (err) => {/* console.log(err)*/})
            
               // let filePath = 'uploads\\terrenos\\'+img
                let filePath = 'uploads/terrenos/'+img  //! linux
                fs.unlink(filePath, (err) => {/* console.log(err)*/})
            }
        }
      }
      if(Array.isArray(oficinasfotos)){
        for (const data of oficinasfotos) {
            let img = data.image
            if(img){
                let splitimg = img.split('.')
                let nimg = splitimg[0]
                nimg = nimg+'.webp'
            
                //let filePath2 = 'uploads\\oficinas\\'+nimg
                  let filePath2 = 'uploads/oficinas/'+nimg   //! linux
                fs.unlink(filePath2, (err) => {/* console.log(err)*/})
            
               // let filePath = 'uploads\\oficinas\\'+img
                let filePath = 'uploads/oficinas/'+img  //! linux
                fs.unlink(filePath, (err) => {/* console.log(err)*/})
            }
        }
      }
      if(Array.isArray(localesfotos)){
        for (const data of localesfotos) {
            let img = data.image
            if(img){
                let splitimg = img.split('.')
                let nimg = splitimg[0]
                nimg = nimg+'.webp'
            
                //let filePath2 = 'uploads\\locales\\'+nimg
                  let filePath2 = 'uploads/locales/'+nimg   //! linux
                fs.unlink(filePath2, (err) => {/* console.log(err)*/})
            
               // let filePath = 'uploads\\locales\\'+img
                let filePath = 'uploads/locales/'+img  //! linux
                fs.unlink(filePath, (err) => {/* console.log(err)*/})
            }
        }
      }
      if(Array.isArray(casasfotos)){
        for (const data of casasfotos) {
            let img = data.image
            if(img){
                let splitimg = img.split('.')
                let nimg = splitimg[0]
                nimg = nimg+'.webp'
            
                //let filePath2 = 'uploads\\casas\\'+nimg
                  let filePath2 = 'uploads/casas/'+nimg   //! linux
                fs.unlink(filePath2, (err) => {/* console.log(err)*/})
            
               // let filePath = 'uploads\\casas\\'+img
                let filePath = 'uploads/casas/'+img  //! linux
                fs.unlink(filePath, (err) => {/* console.log(err)*/})
            }
        }
      }
 
     
    }else{
      status = 'error'
      message= result
    }

    return res.status(200).send({
      message: message,
      status: status,
    });
  },


  uploadImage: async(req,res ) =>{
    const _repo = new colaboradorRepo();
    const _model = new colaboradorModel( _repo);


    const validate = new validService()

    let payload = req.user
    let validAdm = validate.validAdmCol(payload.role)


    if(payload == undefined || payload ==''){
      return res.status(200).send({
        status: 'error',
        message: 'Faltan datos.',
        result:result
      });
    }

    if(!validAdm){
      return res.status(200).send({
        status: 'error',
        message: 'Datos no validos.',
        result:result
      });
    }

    const id = req.params.id;
    let validId = validate.validNum(id)

    if(!validId ){
      return res.status(200).send({
        status: 'error',
        message: 'Tipo de dato no valido.',
        result:result
      });
    }
    
      
        let fileName = 'Imagen no subida';
      
      
     
        let colaborador = await _model.getById(id);
        if(!colaborador.id){
            return res.status(200).send({
                status: 'error',
                message: 'Registro no valido.',
                result:{}
            });
        }

       


        if(req?.files?.image){
          let filePath = req.files.image.path
          let fileSplit= filePath.split('/');
          fileName = fileSplit[2];
          let extSplit = fileName.split('\.')
          let fileExt = extSplit[1];
          fileExt = fileExt.toLowerCase();

          if(fileExt=='png' || fileExt =='jpg' || fileExt =='jpeg' || fileExt =='gif' || fileExt =='webp'){
            let result = await _model.updateImage({image:fileName, id:id})


            if(result=='success'){
              if(colaborador != 'error' && colaborador != 'No se encontraron coincidencias.'){
                let img = colaborador.image
                 if(img != undefined && img != ''){
                  let splitimg = img.split('.')
                  let nimg = splitimg[0]
                  nimg = nimg+'.webp'
  
                  //let filePath2 = 'uploads\\colaborador\\'+nimg
                     let filePath2 = 'uploads/colaborador/'+nimg   //! linux
                  fs.unlink(filePath2, (err) => {/* console.log(err)*/})
  
                  //let filePath = 'uploads\\colaborador\\'+colaborador.image
                   let filePath = 'uploads/colaborador/'+img   //! linux
                  fs.unlink(filePath, (err) => {/* console.log(err)*/})
                 }
               }
            }else{
              let img = fileName
              let splitimg = img.split('.')
              let nimg = splitimg[0]
              nimg = nimg+'.webp'

                //let filePath2 = 'uploads\\colaborador\\'+nimg
                 let filePath2 = 'uploads/colaborador/'+nimg   //! linux
              fs.unlink(filePath2, (err) => {/* console.log(err)*/})

              //let filePath = 'uploads\\colaborador\\'+img
               let filePath = 'uploads/colaborador/'+img   //! linux
              fs.unlink(filePath, (err) => {/* console.log(err)*/})
            }
         
            return res.status(200).send({
              status: "success",
              message: "Imagen actualizada",
              file: req.files,
              result: result
            });
          }else{
            fs.unlink(filePath, (err) =>{
              return res.status(200).send({
                status: "error",
                message: "Extensión no valida"
              });
            })
          }
 
        }else{
          return res.status(200).send({
            status: "error",
            message: fileName
          });
        }
        

  },

  getImageFile: async function (req, res) {
    let image = req.params.image;

    let splitimg = image.split(".");
    let ext = splitimg[1];

    let path_image = "./uploads/colaborador/" + image;

    //metodo que busca la imagen
    const readFile = (path, opts = "utf8") =>
      new Promise((resolve, reject) => {
        try {
          fs.readFile(path, opts, (err, data) => {
            if (err) resolve({ error: err.message });
            else resolve(data);
          });
        } catch (err) {
          resolve({ error: err.message });
        }
      });

    //busqueda
    try {
      if (ext == "webp") {
        const result = await readFile(path_image);
        if (!result.error) {
          return await res.sendFile(path.resolve(path_image));
        }

        //buscarla como jpg
        let imagejpg = `${splitimg[0]}.jpg`;
        let path_jpg = "./uploads/colaborador/" + imagejpg;

        const resultjpg = await readFile(path_jpg);

        if (!resultjpg.error) {
          //procedemos a convertir
          let imagewebp = `${splitimg[0]}.webp`;
          await webp.cwebp(
            `./uploads/colaborador/${imagejpg}`,
            `./uploads/colaborador/${imagewebp}`,
            "-q 80"
          );
          const path_webp = "./uploads/colaborador/" + imagewebp;
          const resultwebp = await readFile(path_webp);
          if (!resultwebp.error) {
            return await res.sendFile(path.resolve(path_webp));
          }
        }

        //buscarla como JPG
        let imageJPG = `${splitimg[0]}.JPG`;
        let path_JPG = "./uploads/colaborador/" + imageJPG;

        const resultJPG = await readFile(path_JPG);

        if (!resultJPG.error) {
          //procedemos a convertir
          let imagewebp = `${splitimg[0]}.webp`;
          await webp.cwebp(
            `./uploads/colaborador/${imageJPG}`,
            `./uploads/colaborador/${imagewebp}`,
            "-q 80"
          );
          const path_webp = "./uploads/colaborador/" + imagewebp;
          const resultwebp = await readFile(path_webp);
          if (!resultwebp.error) {
            return await res.sendFile(path.resolve(path_webp));
          }
        }

        //buscarla como png
        let imagepng = `${splitimg[0]}.png`;
        let path_png = "./uploads/colaborador/" + imagepng;

        const resultpng = await readFile(path_png);

        if (!resultpng.error) {
          //procedemos a convertir
          let imagewebp = `${splitimg[0]}.webp`;
          await webp.cwebp(
            `./uploads/colaborador/${imagepng}`,
            `./uploads/colaborador/${imagewebp}`,
            "-q 80"
          );
          const path_webp = "./uploads/colaborador/" + imagewebp;
          const resultwebp = await readFile(path_webp);
          if (!resultwebp.error) {
            return await res.sendFile(path.resolve(path_webp));
          }
        }

        //buscarla como PNG
        let imagePNG = `${splitimg[0]}.PNG`;
        let path_PNG = "./uploads/colaborador/" + imagePNG;

        const resultPNG = await readFile(path_PNG);

        if (!resultPNG.error) {
          //procedemos a convertir
          let imagewebp = `${splitimg[0]}.webp`;
          await webp.cwebp(
            `./uploads/colaborador/${imagePNG}`,
            `./uploads/colaborador/${imagewebp}`,
            "-q 80"
          );
          const path_webp = "./uploads/colaborador/" + imagewebp;
          const resultwebp = await readFile(path_webp);
          if (!resultwebp.error) {
            return await res.sendFile(path.resolve(path_webp));
          }
        }

        //buscarla como jpeg
        let imagejpeg = `${splitimg[0]}.jpeg`;
        let path_jpeg = "./uploads/colaborador/" + imagejpeg;

        const resultjpeg = await readFile(path_jpeg);

        if (!resultjpeg.error) {
          //procedemos a convertir
          let imagewebp = `${splitimg[0]}.webp`;
          await webp.cwebp(
            `./uploads/colaborador/${imagejpeg}`,
            `./uploads/colaborador/${imagewebp}`,
            "-q 80"
          );
          const path_webp = "./uploads/colaborador/" + imagewebp;
          const resultwebp = await readFile(path_webp);
          if (!resultwebp.error) {
            return await res.sendFile(path.resolve(path_webp));
          }
        }

        //buscarla como JPEG
        let imageJPEG = `${splitimg[0]}.JPEG`;
        let path_JPEG = "./uploads/colaborador/" + imageJPEG;

        const resultJPEG = await readFile(path_JPEG);

        if (!resultJPEG.error) {
          //procedemos a convertir
          let imagewebp = `${splitimg[0]}.webp`;
          await webp.cwebp(
            `./uploads/colaborador/${imageJPEG}`,
            `./uploads/colaborador/${imagewebp}`,
            "-q 80"
          );
          const path_webp = "./uploads/colaborador/" + imagewebp;
          const resultwebp = await readFile(path_webp);
          if (!resultwebp.error) {
            return await res.sendFile(path.resolve(path_webp));
          }
        }

        return res
          .status(200)
          .send({ message: "No existe la imagen", status: "error" });
      } else {
        const result = await readFile(path_image);
        if (!result.error) {
          return await res.sendFile(path.resolve(path_image));
        } else {
          return res
            .status(200)
            .send({ message: "No existe la imagen", status: "error" });
        }
      }
    } catch (err) {
      return res
        .status(200)
        .send({ message: "No existe la imagen", status: "error" });
    }
  },




};








module.exports = controller;
