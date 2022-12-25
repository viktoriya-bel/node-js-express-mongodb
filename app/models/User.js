const { Schema, model } = require('mongoose');

/**
 * Схема задающая модель пользователя в mongodb
 * @type {module:mongoose.Schema<any, Model<EnforcedDocType, any, any, any>, {}, {}, {}, {}, DefaultSchemaOptions, ApplySchemaOptions<ObtainDocumentType<any, EnforcedDocType, TSchemaOptions>, TSchemaOptions>>}
 */
const User = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  roles: [{ type: String, ref: 'Role' }],
})

module.exports = model('User', User);
