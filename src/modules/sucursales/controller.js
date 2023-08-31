"use strict"
var sucursalesModel =require( "./model");
var sucursalesRepo = require("./repo");
let validService = require("../../services/validator/validateParams");


var fs = require("fs");
var path = require('path')
const webp=require('webp-converter');

const controller = {
 
 

  getById: async  (req, res) => {
    const itemRepo = new sucursalesRepo();
    const modelItem = new sucursalesModel( itemRepo);
    let id = parseInt(req.params.id);
    if(isNaN(id) ){
        return res.status(200).send({
            status: 'error',
            message: 'Tipo de dato no valido.'
        });
     }
    let result = await modelItem.getById(id);
   
    let status;

    if(result.id) {
      status = 'success'
      let telefonos = await modelItem.getTelBySuc(result.id);
      if (!Array.isArray(telefonos)) telefonos = [];
      result = {
        ...result, telefonos
      }

    }else{
      status = 'error'
    }
     
    return res.status(200).send({
      status: status,
      result: result
    });
  },
  
  getAll: async  (req, res) => {
    const itemRepo = new sucursalesRepo();
    const modelItem = new sucursalesModel( itemRepo);
   
    let result = await modelItem.getAll();
   
    let status;

    if(Array.isArray(result)){
      status = 'success'
      let arregloVacio = [];
      for (const sucursal of result) {
        let telefonos = await modelItem.getTelBySuc(sucursal.id);
        if (!Array.isArray(telefonos)) telefonos = [];
        arregloVacio.push( {
          ...sucursal, telefonos
        })
      }
    result = arregloVacio;

    }else{
      status = 'error'
    }
     
    return res.status(200).send({
      status: status,
      result: result
    });
  },


  create: async (req,res) =>{
    const itemRepo = new sucursalesRepo();
    const modelItem = new sucursalesModel( itemRepo);

    let { nombre, tipo, direccion, mapa, telefonos} = req.body;
   
    telefonos = JSON.parse(telefonos);




    console.log(telefonos)
    if( nombre == undefined || nombre == null || nombre ==''){
      return res.status(200).send({
        status:'error',
        message: "Nombre no valido",
      });
    }

    if( tipo == undefined || tipo == null || tipo ==''){
      return res.status(200).send({
        status:'error',
        message: "Tipo no valido",
      });
    }

    if( direccion == undefined || direccion == null || direccion ==''){
      return res.status(200).send({
        status:'error',
        message: "Direccion no valida",
      });
    }


    if( mapa == undefined || mapa == null || mapa ==''){
      return res.status(200).send({
        status:'error',
        message: "Mapa no valido",
      });
    }
  


    // IMAGEN
    let fileName = 'Imagen pc no subida';

    if(req?.files?.image == undefined){
      return res.status(200).send({
        status: "error",
        message: fileName
      });
    }


    //Todo bien
    
      let filePath = req.files.image.path
      let fileSplit= filePath.split('\\') //\
      fileName = fileSplit[2];
      let extSplit = fileName.split('\.')
      let fileExt = extSplit[1];
      fileExt = fileExt.toLowerCase();
      if(fileExt !='png' && fileExt !='jpg' && fileExt !='jpeg' && fileExt !='gif'){ //!! no cumple con las extensiones
        
        fs.unlink(filePath, (err) =>{
          return res.status(200).send({
            status: "error",
            message: "Extensión no valida"
          });
        })

      }
  
      //guardar
      let result = await modelItem.create(nombre, tipo, fileName, direccion, mapa);
      let status = 'success'
      let mensaje = "Item creado"

      console.log(result)
      if(!result.insertId){
        status ='error'
        let img = fileName
        mensaje = "item no creado"
          if(img != '' && img != null && img != undefined){
            let splitimg = img.split('.')
            let nimg = splitimg[0]
            nimg = nimg+'.webp'
        
            //let filePath = 'uploads\\sucursales\\'+img
           let filePath = 'uploads/sucursales/'+img  //! linux
            fs.unlink(filePath, (err) => { /*console.log(err)*/})
        }
      } else {
        for (const numero of telefonos) {
          await modelItem.create_tel({id_sucursal:result.insertId, numero })
        }
      }

      return res.status(200).send({
        status: status,
        message: mensaje,
      });

      
  },

  update: async (req,res) =>{
    const itemRepo = new sucursalesRepo();
    const modelItem = new sucursalesModel( itemRepo);

    let {id, nombre, tipo, direccion, mapa} = req.body;
    let validate = new validService();
    let validate_id = validate.validNum(id);
    if (!validate_id) {
      return res.status(200).send({
        status: "error",
        message: "Datos no validos.",
      });
    }

    let getById = await modelItem.getById(id);
    if (!getById.id) {
      return res.status(200).send({
        status: "error",
        message: "Registro no encontrado",
      });
    }



    if( nombre == undefined || nombre == null || nombre ==''){
      return res.status(200).send({
        status:'error',
        message: "Nombre no valido",
      });
    }

    if( tipo == undefined || tipo == null || tipo ==''){
      return res.status(200).send({
        status:'error',
        message: "Tipo no valido",
      });
    }

    if( direccion == undefined || direccion == null || direccion ==''){
      return res.status(200).send({
        status:'error',
        message: "Direccion no valida",
      });
    }


    if( mapa == undefined || mapa == null || mapa ==''){
      return res.status(200).send({
        status:'error',
        message: "Mapa no valido",
      });
    }
  


    // IMAGEN
    let fileName = 'Imagen pc no subida';

    if(!req?.files?.image){
      let result = await modelItem.update({id, nombre, tipo, image:getById.image, direccion, mapa});
      if(result !='success'){
        return res.status(200).send({
          status: "error",
          message: result
        });
      }
      return res.status(200).send({
        status: "succes",
        message: "Sucursal actualizado"
      });
    } else {
      //Todo bien
    
      let filePath = req.files.image.path
      let fileSplit= filePath.split('\\') //\
      fileName = fileSplit[2];
      let extSplit = fileName.split('\.')
      let fileExt = extSplit[1];
      fileExt = fileExt.toLowerCase();
      if(fileExt !='png' && fileExt !='jpg' && fileExt !='jpeg' && fileExt !='gif'){ //!! no cumple con las extensiones
        
        fs.unlink(filePath, (err) =>{
          return res.status(200).send({
            status: "error",
            message: "Extensión no valida"
          });
        })

      }
  
      //guardar
      let result = await modelItem.update({id, nombre, tipo, image:fileName, direccion, mapa});
      let status = 'success'

      if(result !='success'){
        status ='error'
        let img = fileName
          if(img != '' && img != null && img != undefined){
            let splitimg = img.split('.')
            let nimg = splitimg[0]
            nimg = nimg+'.webp'
        
            //let filePath = 'uploads\\sucursales\\'+img
           let filePath = 'uploads/sucursales/'+img //! linux
            fs.unlink(filePath, (err) => { /*console.log(err)*/})
        }
      }

      else {
        let img = getById.image
          if(img != '' && img != null && img != undefined){
            let splitimg = img.split('.')
            let nimg = splitimg[0]
            nimg = nimg+'.webp'
        
            let filePath = 'uploads\\sucursales\\'+img
           //let filePath = 'uploads/sucursales/'+img //! linux
            fs.unlink(filePath, (err) => { /*console.log(err)*/})
        }
      }

      return res.status(200).send({
        status: status,
        message: result,
      });

    }

    

    
      
  },



delete: async  (req, res) => {
  const itemRepo = new sucursalesRepo();
  const modelItem = new sucursalesModel( itemRepo);
  let params = req.body;

  let id = params.id;

  if(isNaN(id) || id== undefined || id =='' || id == null ){
    return res.status(200).send({
        status: 'error',
        message: 'Tipo de dato no valido.'
    });
 }


  let sucursales = await modelItem.getById(id);

 id = parseInt(params.id);


  let result = await modelItem.delete(id);

  let status='success';
  result != 'success' ? status = 'error' : status

  if(result == 'success'){
    let img = sucursales.image 
    if(img != '' && img != null && img != undefined){
      let splitimg = img.split('.')
      let nimg = splitimg[0]
      nimg = nimg+'.webp'
  
      //let filePath2 = 'uploads\\sucursales\\'+nimg
       let filePath2 = 'uploads/sucursales/'+nimg   //! linux
      fs.unlink(filePath2, (err) => {/*console.log(err)*/ })
  
      //let filePath = 'uploads\\sucursales\\'+img
     let filePath = 'uploads/sucursales/'+img  //! linux
      fs.unlink(filePath, (err) => { /*console.log(err)*/})
     }

  }
  
  return res.status(200).send({
    message: result,
    status: status,
  });
},

getImageFile: function(req,res){
    let image = req.params.image;
    if(image == undefined || image== null || image == ''){
      return  res.status(200).send({message:'No existe la imagen', status:'error'});
    }


     
    let splitimg = image.split('.')
    let ext = splitimg[1]

    let path_image = './uploads/sucursales/'+image;

    if(ext == 'webp'){
      fs.access(path_image, fs.constants.F_OK,(err)=>{
        if(err){
            //buscarla como jpg
            let imagejpg = `${splitimg[0]}.jpg`
            let path_image2 = './uploads/sucursales/'+imagejpg;
            fs.access(path_image2, fs.constants.F_OK,(err)=>{
              if(err){
                 //buscarla como png
                  let imagepng = `${splitimg[0]}.png`
                  let path_image2 = './uploads/sucursales/'+imagepng;
                  fs.access(path_image2, fs.constants.F_OK,(err)=>{
                    if(err){
                       //buscarla como jpeg
                       let imagejpeg = `${splitimg[0]}.jpeg`
                       let path_image2 = './uploads/sucursales/'+imagejpeg;
                       fs.access(path_image2, fs.constants.F_OK,(err)=>{
                         if(err){
                             return  res.status(200).send({message:'No existe la imagen', status:'error'});
                         }else{
                               //convertir a webp
                               let imagewebp = `${splitimg[0]}.webp`
                             
                               const result3 =  webp.cwebp(`./uploads/sucursales/${imagejpeg}`, `./uploads/sucursales/${imagewebp}`,"-q 80"); 
                               result3.then((response) => {
                               
                                 let path_image3 = './uploads/sucursales/'+imagewebp
                                 fs.access(path_image3, fs.constants.F_OK,(err)=>{
                                   if(err){
                                     return  res.status(200).send({message:'No existe la imagen', status:'error'});
                                   }else{
                                     return res.sendFile(path.resolve(path_image));
                                   }
                                 })
                               });
                         }
                       })
                    }else{
                          //convertir a webp
                          let imagewebp = `${splitimg[0]}.webp`
                        
                          const result3 =  webp.cwebp(`./uploads/sucursales/${imagepng}`, `./uploads/sucursales/${imagewebp}`,"-q 80"); 
                          result3.then((response) => {
                          
                            let path_image3 = './uploads/sucursales/'+imagewebp
                            fs.access(path_image3, fs.constants.F_OK,(err)=>{
                              if(err){
                                return  res.status(200).send({message:'No existe la imagen', status:'error'});
                              }else{
                                return res.sendFile(path.resolve(path_image));
                              }
                            })
                          });
                    }
                  })


              }else{
                    //convertir a webp
                    let imagewebp = `${splitimg[0]}.webp`
                   
                    const result3 =  webp.cwebp(`./uploads/sucursales/${imagejpg}`, `./uploads/sucursales/${imagewebp}`,"-q 80"); 
                    result3.then((response) => {
                     
                      let path_image3 = './uploads/sucursales/'+imagewebp
                      fs.access(path_image3, fs.constants.F_OK,(err)=>{
                        if(err){
                          return  res.status(200).send({message:'No existe la imagen', status:'error'});
                        }else{
                          return res.sendFile(path.resolve(path_image));
                        }
                      })
                    });
                    
              


              }

              
            })




        }else{
          return res.sendFile(path.resolve(path_image));
        }
      })
    }else{
      fs.access(path_image, fs.constants.F_OK,(err)=>{
        if(err){
          return  res.status(200).send({message:'No existe la imagen', status:'error'});
        }else{
          return res.sendFile(path.resolve(path_image));
        }
      })
    }


  },

  create_tel: async (req,res) =>{
    const itemRepo = new sucursalesRepo();
    const modelItem = new sucursalesModel( itemRepo);

    let { id_sucursal, numero} = req.body;
    
    const validate = new validService();
    let validId = validate.validNum(id_sucursal);
    if(!validId) {
      return res.status(200).send({
        status: "error",
        message: "Id no valido"
      });
    }

    let validNum = validate.validParam(numero);
    if (!validNum) {
      return res.status(200).send({
        status: "error",
        message: "Telefono no valido"
      });
    }

    let result =  await modelItem.create_tel({id_sucursal, numero});

    if (result != "success") {
      return res.status(200).send({
        status: "error",
        message: "Telefono no creado"
      });

    } else {
      return res.status(200).send({
        status: "success",
        message: "Telefono creado"
      });

    }
  },


  delete_tel: async  (req, res) => {
    const itemRepo = new sucursalesRepo();
    const modelItem = new sucursalesModel( itemRepo);
    let params = req.body;
  
    let id = params.id;
  
    if(isNaN(id) || id== undefined || id =='' || id == null ){
      return res.status(200).send({
          status: 'error',
          message: 'Tipo de dato no valido.'
      });
   }
  
  
    let result = await modelItem.delete_tel(id);
  
    let status='success';
    result != 'success' ? status = 'error' : status
  
    
    return res.status(200).send({
      message: result,
      status: status,
    });
  },




};

module.exports = controller;
