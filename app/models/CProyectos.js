module.exports = function (mongoose, config) {

  var Schema = mongoose.Schema
  	, ObjectId = Schema.ObjectId
    , salt_factor = config.salt || 10

  // Define user schema
  var proyectoSchema = new Schema({
  	nombre: { type: String, required: true },
  	descripcion: { type: String, required: true }
  }, { versionKey: false });

  /*
   * Methods
   */
   return mongoose.model('Cproyectos', proyectoSchema)
}
