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

  }
}
