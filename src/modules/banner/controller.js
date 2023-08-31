"use strict"
var bannerModel =require( "./model");
var bannerRepo = require("./repo");

var fs = require("fs");
var path = require('path')
const webp=require('webp-converter');

const controller = {
 
 

  getById: async  (req, res) => {
    const itemRepo = new bannerRepo();
    const modelItem = new bannerModel( itemRepo);
    let id = parseInt(req.params.id);
    if(isNaN(id) ){
        return res.status(200).send({
            status: 'error',
            message: 'Tipo de dato no valido.'
        });
     }
    let result = await modelItem.getById(id);
   
    let status;

    if(result != 'No se encontraron coincidencias'){
      status = 'success'
    }else{
      status = 'error'
    }
     
    return res.status(200).send({
      status: status,
      result: result
    });
  },

  
  


  
  getAll: async  (req, res) => {
    const itemRepo = new bannerRepo();
    const modelItem = new bannerModel( itemRepo);
   
    let result = await modelItem.getAll();
   
    let status;

    if(result != 'No se encontraron coincidencias'){
      status = 'success'
    }else{
      status = 'error'
    }
     
    return res.status(200).send({
      status: status,
      result: result
    });
  },


  create: async (req,res) =>{
    const itemRepo = new bannerRepo();
    const modelItem = new bannerModel( itemRepo);

    let { link, type} = req.body;

    if( link == undefined || link == null || link ==''){
      return res.status(200).send({
        status:'error',
        message: "Link no valido",
      });
    }


    if( type == undefined || type == null || type ==''){
      return res.status(200).send({
        status:'error',
        message: "Tipo no valido",
      });
    }
  


    // IMAGEN
    let fileName = 'Imagen pc no subida';
    let fileName2 = 'Imagen movil no subida';

    if(req.files.image == undefined){
      return res.status(200).send({
        status: "error",
        message: fileName
      });
    }

    if(req.files.image_mv == undefined){
      return res.status(200).send({
        status: "error",
        message: fileName2
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

      let filePath2 = req.files.image_mv.path
      let fileSplit2= filePath2.split('\\')
      fileName2 = fileSplit2[2];
      let extSplit2 = fileName2.split('\.')
      let fileExt2 = extSplit2[1];
      fileExt2 = fileExt2.toLowerCase();
      if(fileExt2 !='png' && fileExt2 !='jpg' && fileExt2 !='jpeg' && fileExt2 !='gif'){ //!! no cumple con las extensiones
        
        fs.unlink(filePath2, (err) =>{
          return res.status(200).send({
            status: "error",
            message: "Extensión no valida"
          });
        })

      }
  
      //guardar
      let result = await modelItem.create( link, fileName, fileName2, type);
      let status = 'success'

      if(result !='success'){
        status ='error'
        let img = fileName
          if(img != '' && img != null && img != undefined){
            let splitimg = img.split('.')
            let nimg = splitimg[0]
            nimg = nimg+'.webp'
        
            //let filePath2 = 'uploads\\banner\\'+nimg
             let filePath2 = 'uploads/banner/'+nimg   //! linux
            fs.unlink(filePath2, (err) => {/*console.log(err)*/ })
        
            //let filePath = 'uploads\\banner\\'+img
           let filePath = 'uploads/banner/'+img  //! linux
            fs.unlink(filePath, (err) => { /*console.log(err)*/})
        }

        let img2 = fileName2
          if(img2 != '' && img2 != null && img2 != undefined){
            let splitimg2 = img2.split('.')
            let nimg2 = splitimg2[0]
            nimg2 = nimg2+'.webp'
        
            //let filePath2 = 'uploads\\banner\\'+nimg
             let filePath4 = 'uploads/banner/'+nimg2   //! linux
            fs.unlink(filePath4, (err) => {/*console.log(err)*/ })
        
            //let filePath = 'uploads\\banner\\'+img
           let filePath5 = 'uploads/banner/'+img2  //! linux
            fs.unlink(filePath5, (err) => { /*console.log(err)*/})
        }
      }

      return res.status(200).send({
        status: status,
        message: result,
      });




  
  },



delete: async  (req, res) => {
  const itemRepo = new bannerRepo();
  const modelItem = new bannerModel( itemRepo);
  let params = req.body;

  let id = params.id;

  if(isNaN(id) || id== undefined || id =='' || id == null ){
    return res.status(200).send({
        status: 'error',
        message: 'Tipo de dato no valido.'
    });
 }


  let banner = await modelItem.getById(id);

 id = parseInt(params.id);


  let result = await modelItem.delete(id);

  let status='success';
  result != 'success' ? status = 'error' : status

  if(result == 'success'){
    let img = banner.image 
    if(img != '' && img != null && img != undefined){
      let splitimg = img.split('.')
      let nimg = splitimg[0]
      nimg = nimg+'.webp'
  
      //let filePath2 = 'uploads\\banner\\'+nimg
       let filePath2 = 'uploads/banner/'+nimg   //! linux
      fs.unlink(filePath2, (err) => {/*console.log(err)*/ })
  
      //let filePath = 'uploads\\banner\\'+img
     let filePath = 'uploads/banner/'+img  //! linux
      fs.unlink(filePath, (err) => { /*console.log(err)*/})
     }

     let img2 = banner.image_mv 
      if(img2 != '' && img2 != null && img2 != undefined){
        let splitimg2 = img2.split('.')
        let nimg2 = splitimg2[0]
        nimg2 = nimg2+'.webp'
    
        //let filePath2 = 'uploads\\banner\\'+nimg
        let filePath4 = 'uploads/banner/'+nimg2   //! linux
        fs.unlink(filePath4, (err) => {/*console.log(err)*/ })
    
        //let filePath = 'uploads\\banner\\'+img
      let filePath5 = 'uploads/banner/'+img2  //! linux
        fs.unlink(filePath5, (err) => { /*console.log(err)*/})
      }

  }
  
  return res.status(200).send({
    message: result,
    status: status,
  });
},

actualizarOrden: async  (req, res) => {
  const itemRepo = new bannerRepo();
  const modelItem = new bannerModel( itemRepo);
  let {banner} = req.body;
  
  let result =''

  if(banner==undefined || banner == null || banner==''){
    return res.status(200).send({
      message: 'Lista no valida.',
      status: 'error',
    });
  }

  // eliminar los registros
  let deleteall = await modelItem.deleteAll();


  //reinsertar items
  let results =[]
  for(var i=0; i<banner.length; i++){
    let  result = await modelItem.create( banner[i].link, banner[i].image, banner[i].image_mv, banner[i].type);
    results.push(result)
  }

  
  let message ='Slider actualizado con exito.'
  let status='success';
  
  
  return res.status(200).send({
    message: message,
    result:results,
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

    let path_image = './uploads/banner/'+image;

    if(ext == 'webp'){
      fs.access(path_image, fs.constants.F_OK,(err)=>{
        if(err){
            //buscarla como jpg
            let imagejpg = `${splitimg[0]}.jpg`
            let path_image2 = './uploads/banner/'+imagejpg;
            fs.access(path_image2, fs.constants.F_OK,(err)=>{
              if(err){
                 //buscarla como png
                  let imagepng = `${splitimg[0]}.png`
                  let path_image2 = './uploads/banner/'+imagepng;
                  fs.access(path_image2, fs.constants.F_OK,(err)=>{
                    if(err){
                       //buscarla como jpeg
                       let imagejpeg = `${splitimg[0]}.jpeg`
                       let path_image2 = './uploads/banner/'+imagejpeg;
                       fs.access(path_image2, fs.constants.F_OK,(err)=>{
                         if(err){
                             return  res.status(200).send({message:'No existe la imagen', status:'error'});
                         }else{
                               //convertir a webp
                               let imagewebp = `${splitimg[0]}.webp`
                             
                               const result3 =  webp.cwebp(`./uploads/banner/${imagejpeg}`, `./uploads/banner/${imagewebp}`,"-q 80"); 
                               result3.then((response) => {
                               
                                 let path_image3 = './uploads/banner/'+imagewebp
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
                        
                          const result3 =  webp.cwebp(`./uploads/banner/${imagepng}`, `./uploads/banner/${imagewebp}`,"-q 80"); 
                          result3.then((response) => {
                          
                            let path_image3 = './uploads/banner/'+imagewebp
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
                   
                    const result3 =  webp.cwebp(`./uploads/banner/${imagejpg}`, `./uploads/banner/${imagewebp}`,"-q 80"); 
                    result3.then((response) => {
                     
                      let path_image3 = './uploads/banner/'+imagewebp
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
