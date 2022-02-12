const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

exports.getModel = (recourse) => {
  const modelName = recourse.name;
  const ModelSchema = new mongoose.Schema(recourse.data_base_columns, {
    timestamps: true
  });
  
  ModelSchema.plugin(mongoosePaginate);

  try {
    return mongoose.model(modelName);
  } catch (error) {
    return mongoose.model(modelName, ModelSchema);
  }
};
