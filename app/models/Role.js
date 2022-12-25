const { Schema, model } = require('mongoose');

/**
 * Схема задающая модель роли в mongodb
 * @type {module:mongoose.Schema<any, Model<EnforcedDocType, any, any, any>, {}, {}, {}, {}, DefaultSchemaOptions, ApplySchemaOptions<ObtainDocumentType<any, EnforcedDocType, TSchemaOptions>, TSchemaOptions>>}
 */
const Role = new Schema({
  value: { type: String, unique: true, default: 'user' },
})

module.exports = model('Role', Role);
