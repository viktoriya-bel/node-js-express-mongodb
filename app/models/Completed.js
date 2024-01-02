const { Schema, model } = require('mongoose');

/**
 * Схема задающая модель завершенных- задач в mongodb
 * @type {module:mongoose.Schema<any, Model<EnforcedDocType, any, any, any>, {}, {}, {}, {}, DefaultSchemaOptions, ApplySchemaOptions<ObtainDocumentType<any, EnforcedDocType, TSchemaOptions>, TSchemaOptions>>}
 */
const Completed = new Schema({
    username: [{ type: String, ref: 'User' }],
    date_completed: { type: String, required: true },
    block: { type: String, required: true },
    time: { type: Number, required: true },
});

module.exports = model('Completed', Completed);
