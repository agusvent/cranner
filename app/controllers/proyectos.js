module.exports = function (db, utils) {
  return {
    crear: function (req, res) {
      console.log("Estoy en el crear Proyecto");
      //debugger;
      console.log(req.body);
      new db.CProyectos(req.body).save(function (err, proyecto) {
        if(err) return utils.error(res, 403, 'Error en la carga de proyecto')
        if(!proyecto) return utils.error(res, 403, 'No se creó el proyecto')
        res.status(201).json(proyecto);
      })
    },

    list: function (req, res) {
      db.CProyectos.find({  }, function (err, proyectos) {
        console.log("List. Proyectos:", proyectos);
        res.json(proyectos || [])
      })
    },

    findById: function(req,res){
      console.log(req.params.nombre);
      console.log("Proyecto.findById ==> ID: "+req.params.id);
      db.CProyectos.findOne({_id: req.params.id  }, function (err, proyecto) {
        console.log("Proyectos x ID:", proyecto);
        res.json(proyecto);
      })
    },

    edit: function(req,res){
      console.log("Proyecto.edit ID ==> "+req.body._id);
      console.log("Proyecto.edit NOM==> "+req.body.nombre);
      console.log("Proyecto.edit DESC==> "+req.body.descripcion);
      db.CProyectos.findOneAndUpdate({ _id: req.body._id }, { $set: { 'nombre': req.body.nombre, 'descripcion': req.body.descripcion }}, function(err,proyecto){
        res.json([]);
      });
    },

    uploadImageToProyecto: function(req,res,next){
      console.log("uploadImageToProyecto",req.query.idProyecto)
      /*
      db.CProyectos.findOneAndUpdate({ _id: req.query.idProyecto }, { $set: { 'images': {'filename': req.query.fileName} }}, function(err,proyecto){
        console.log("Proy: ",proyecto);
        console.log("Error: ",err);
        //res.status(200).json(proyecto);
        next();
      });
*/
      db.CProyectos.findOne({_id: req.query.idProyecto  }, function (err, proyecto) {
        console.log("Proyectos x ID:", proyecto);
        proyecto.images.push({'filename': req.query.fileName});
        console.log("Proyecto con el Push:", proyecto);
        proyecto.save(function (err, proyecto) {
          console.log("Proyecto grabado");
          if(err){
            console.log("Error: ",err);
            return utils.error(res, 403, 'Error en la carga de proyecto');
          }
          if(!proyecto){
            return utils.error(res, 403, 'No se creó el proyecto');
          }
          //res.json(proyecto);
          next();
        })
      })

    },

    delete: function (req, res) {
      console.log("ELIMNANDO PROYECTO");
      //console.log(req.params)
      db.CProyectos.remove({ _id: req.params.id }, function (err, proyecto) {
        if(err){
          return utils.error(res, 403, 'Error en la eliminacion de proyecto');
        }
        console.log("DEVOLUCION REMOVE: "+proyecto);
        //PROYECTO ME DEVUELVE 1, SUPONGO QUE PORQ SE ELIMINO CORRECTAMENTE
        if(!proyecto){
          return utils.error(res, 403, 'No se creó el proyecto');
        }
        console.log("Proyecto ELIMINADO");


        res.status(200).json(proyecto);
      })
    },

    deleteImage: function(req,res,next){
      console.log("***********************************")
      console.log("PROYECTOS CONTROLLER - DELETE IMAGE")
      console.log("***********************************")
      console.log("deleteImage Param",req.param.idProyecto)
      console.log("deleteImage Query",req.query.idProyecto)
      /*
      db.CProyectos.findOneAndUpdate({ _id: req.query.idProyecto }, { $set: { 'images': {'filename': req.query.fileName} }}, function(err,proyecto){
        console.log("Proy: ",proyecto);
        console.log("Error: ",err);
        //res.status(200).json(proyecto);
        next();
      });
*/
      db.CProyectos.findOne({_id: req.query.idProyecto  }, function (err, proyecto) {

        console.log("Eliminar Imagen. Proyecto: ",proyecto)
        console.log("Eliminar Imagen. Imagen: ",req.query.idImagen)

        proyecto.images.pull({_id: req.query.idImagen});
        console.log("Ahora: ",proyecto);
        proyecto.save(function (err, proyecto) {
          console.log("Proyecto grabado");
          if(err){
            console.log("Error: ",err);
            return utils.error(res, 403, 'Error en la carga de proyecto');
          }
          if(!proyecto){
            return utils.error(res, 403, 'No se creó el proyecto');
          }
          console.log("Proyecto grabado. No hay errores");
          res.json(proyecto);
          //next();
        })


      })

    },


  }
}
