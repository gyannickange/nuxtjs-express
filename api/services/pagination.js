const { getModel } = require('../models/generic');

exports.getPaginate = async (resource, page, perPage) => {
  const currentModel = await getModel(resource);
  let skip = (page - 1) * perPage;
  let totalDocs = currentModel.count();
  let docs = currentModel.find({}).skip(skip).limit(perPage).sort(resource.sort)

  return {
    totalDocs: totalDocs,
    docs: docs,
    page: page
  }
}

exports.getSearchAndPaginate = async (resource, page, perPage) => {
  return await `get${resource.name}Result`
}

const getResult = async () => {

};

const getDataToCreateOrSave = async (body, data_base_columns) => {
  // let dataToCreateOrSave = {}
  // for (const [key, value] of Object.entries(data_base_columns)) {
  //   dataToCreateOrSave[key] = body[key]
  // }
  // return dataToCreateOrSave;
};
