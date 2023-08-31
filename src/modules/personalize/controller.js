"use strict"
var personalizeModel =require( "./model");
var personalizeRepo = require("./repo");

let validService = require("../../services/validator/validateParams")


var fs = require("fs");
var path = require('path')
const webp = require('webp-converter');

const controller = {
 
  getAll: async  (req, res) => {
    const _repo = new personalizeRepo();
    const _model = new personalizeModel( _repo);
  

    let data = await _model.getAll();
    let status ='success'
    let message ='Logo'
   
     if(!Array.isArray(data)){
        status='error'
        message = data
        
     }

     return res.status(200).send({
      status: status,
      message: message,
      result: data
    });



    
  },

  getById: async  (req, res) => {
    const _repo = new personalizeRepo();
    const _model = new personalizeModel( _repo);
   

    let id = parseInt(req.params.id);

    const validate = new validService()
    let validID = validate.validNum(id)
    if(!validID){
        return res.status(200).send({
            status: 'error',
            message: 'Tipo de dato no valido.',
           
          });
    }


    let data = await _model.getById(id);
   
    let status;
    let message='Logo encontrado.'

   


    if(!data.id ){
     
      status = 'error'
      message = data
      
    }
     
    return res.status(200).send({
      status: status,
      message: message,
      result: data
    });
  },


 

 

  update: async(req, res) =>{
    const _repo = new personalizeRepo();
    const _model = new personalizeModel( _repo);

    let {id} = req.body
    

    let message='Logo actualizado con exito.'
    let result =''
    let status ='success';

    const validate = new validService()

    let payload = req.user
    let validAdm = validate.validAdm(payload.role)


    if(payload == undefined || payload ==''){
      if(req?.files?.image){
        let filePath = req.files.image.path
        fs.unlink(filePath, (err) => {if(err) console.log(err);})
      }


      return res.status(200).send({
        status: 'error',
        message: 'Faltan datos.',
        result:result
      });
    }

    if(!validAdm){
      if(req?.files?.image){
        let filePath = req.files.image.path
        fs.unlink(filePath, (err) => {if(err) console.log(err);})
      }


      return res.status(200).send({
        status: 'error',
        message: 'Datos no validos.',
        result:result
      });
    }

    let validId = validate.validNum(id)

    if(!validId ){
      if(req?.files?.image){
        let filePath = req.files.image.path
        fs.unlink(filePath, (err) => {if(err) console.log(err);})
      }


      return res.status(200).send({
        status: 'error',
        message: 'Tipo de dato no valido.',
        result:result
      });
    }

    let getById = await _model.getById(id);

    
    //validar datos
    if(!getById.id){

      if(req?.files?.image){
        let filePath = req.files.image.path
        fs.unlink(filePath, (err) => {if(err) console.log(err);})
      }


      return res.status(200).send({
        status: 'error',
        message: 'Logo no encontrado.',
        result:result
      });
    }

    const lastimg =getById.logo
    let fileName = 'Imagen no subida';
   
    try{
      if(req?.files?.image){
        let filePath = req.files.image.path
        let fileSplit= filePath.split('/');
        fileName = fileSplit[2];
        let extSplit = fileName.split('\.')
        let fileExt = extSplit[1];
        fileExt = fileExt.toLowerCase();
  
        if(fileExt=='png' || fileExt =='jpg' || fileExt =='jpeg' || fileExt =='gif'){
          let result = await _model.update({logo:fileName, id:id})
  
  
          if(result=='success'){
              if(lastimg !='logo.png'){
                let img = lastimg
                if(img != undefined && img != ''){
                 let splitimg = img.split('.')
                 let nimg = splitimg[0]
                 nimg = nimg+'.webp'
   
                    //let filePath2 = 'uploads\\logo\\'+nimg
                    let filePath2 = 'uploads/logo/'+nimg   //! linux
                 fs.unlink(filePath2, (err) => {/* console.log(err)*/})
   
                  //let filePath = 'uploads\\logo\\'+lastimg
                  let filePath = 'uploads/logo/'+img   //! linux
                 fs.unlink(filePath, (err) => {/* console.log(err)*/})
                }
              }
          }else{
            let img = fileName
            let splitimg = img.split('.')
            let nimg = splitimg[0]
            nimg = nimg+'.webp'
  
              //let filePath2 = 'uploads\\logo\\'+nimg
               let filePath2 = 'uploads/logo/'+nimg   //! linux
            fs.unlink(filePath2, (err) => {/* console.log(err)*/})
  
            //let filePath = 'uploads\\logo\\'+img
            let filePath = 'uploads/logo/'+img   //! linux
            fs.unlink(filePath, (err) => {/* console.log(err)*/})
          }
       
          return res.status(200).send({
            status: "success",
            message: "Logo actualizado",
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
        if(req?.files?.image){
          let filePath = req.files.image.path
          fs.unlink(filePath, (err) => {if(err) console.log(err);})
        }

        return res.status(200).send({
          status: "error",
          message: fileName,
        });
      }
    }catch(err){
      console.log(err)
      if(req?.files?.image){
        let filePath = req.files.image.path
        fs.unlink(filePath, (err) => {if(err) console.log(err);})
      }
      return res.status(200).send({
        status: "error",
        message: 'Ha ocurrido un error al intentar actualizar la imagen'
      });
    }
   


   
      
  },


  getImageFile: function(req,res){
    let image = req.params.image;
    if(image == undefined || image== null || image == ''){
      return  res.status(200).send({message:'No existe la imagen', status:'error'});
    }


     
    let splitimg = image.split('.')
    let ext = splitimg[1]

    let path_image = './uploads/logo/'+image;

    if(ext == 'webp'){
      fs.access(path_image, fs.constants.F_OK,(err)=>{
        if(err){
            //buscarla como jpg
            let imagejpg = `${splitimg[0]}.jpg`
            let path_image2 = './uploads/logo/'+imagejpg;
            fs.access(path_image2, fs.constants.F_OK,(err)=>{
              if(err){
                 //buscarla como png
                  let imagepng = `${splitimg[0]}.png`
                  let path_image2 = './uploads/logo/'+imagepng;
                  fs.access(path_image2, fs.constants.F_OK,(err)=>{
                    if(err){
                       //buscarla como jpeg
                       let imagejpeg = `${splitimg[0]}.jpeg`
                       let path_image2 = './uploads/logo/'+imagejpeg;
                       fs.access(path_image2, fs.constants.F_OK,(err)=>{
                         if(err){
                             return  res.status(200).send({message:'No existe la imagen', status:'error'});
                         }else{
                               //convertir a webp
                               let imagewebp = `${splitimg[0]}.webp`
                             
                               const result3 =  webp.cwebp(`./uploads/logo/${imagejpeg}`, `./uploads/logo/${imagewebp}`,"-q 80"); 
                               result3.then((response) => {
                               
                                 let path_image3 = './uploads/logo/'+imagewebp
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
                        
                          const result3 =  webp.cwebp(`./uploads/logo/${imagepng}`, `./uploads/logo/${imagewebp}`,"-q 80"); 
                          result3.then((response) => {
                          
                            let path_image3 = './uploads/logo/'+imagewebp
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
                   
                    const result3 =  webp.cwebp(`./uploads/logo/${imagejpg}`, `./uploads/logo/${imagewebp}`,"-q 80"); 
                    result3.then((response) => {
                     
                      let path_image3 = './uploads/logo/'+imagewebp
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




};








module.exports = controller;
