module.exports = function (mongoose, config) {

  var Schema = mongoose.Schema
  	, ObjectId = Schema.ObjectId
    , salt_factor = config.salt || 10

  var ImagenesSchema = new Schema({
    filename: {type: String, required: true}
  })

  var proyectoSchema = new Schema({
  	nombre: { type: String, required: true },
  	descripcion: { type: String, required: true },
    images: {type: [ImagenesSchema], required: false}
  }, { versionKey: false });

   return mongoose.model('Cproyectos', proyectoSchema)
}
