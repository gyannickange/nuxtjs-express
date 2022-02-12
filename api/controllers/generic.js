const resources = require('../../resources');
const _ = require('lodash');
const { getModel } = require('../models/generic');
const { getPaginate } = require('../services/pagination');

exports.getResources = async (req, res) => {
  const resource = await getCurrentResource(resources.genericTables, req.baseUrl.substring(4));
  const currentModel = await getModel(resource);
  let page = req.query.page || 1;
  let perPage = 2;
  
  if (req.query.search) {
    data = await getSearchAndPaginate(resource, page, perPage)
  } else if (!req.query.all_items) {
    data = await getPaginate(resource, page, perPage)
  } else {
    data = await currentModel.find().sort(resource.sort_by);
  }

  res.json({
    resources: data,
    resource_name: resource.name,
    display_name: resource.display_name,
    table_column: resource.admin_table_column,
    actions: resource.admin_table_actions,
    filters: resource.admin_table_filters,
    search: resource.admin_table_search,
  });
};

exports.postResource = async (req, res) => {
  const resource = await getCurrentResource(resources.genericTables, req.baseUrl.substring(4));
  const currentModel = await getModel(resource);
  let dataToCreateOrSave = await getDataToCreateOrSave(req.body, resource.data_base_columns);
  let data = new currentModel(dataToCreateOrSave);
  data = await data.save();
  res.json(data);
};

exports.putResource = async (req, res) => {
  const resource = await getCurrentResource(resources.genericTables, req.baseUrl.substring(4));
  const currentModel = await getModel(resource);
  let dataToCreateOrSave = await getDataToCreateOrSave(req.body, resource.data_base_columns);
  let data = await currentModel.findByIdAndUpdate(req.params.id, dataToCreateOrSave, { new: true });
  if (!data) return res.status(404).json(`The ${resources.name} with the given ID was not found.`);
  res.json(data);
};

exports.deleteResource = async (req, res) => {
  const resource = await getCurrentResource(resources.genericTables, req.baseUrl.substring(4))
  const currentModel = await getModel(resource);
  let data = await currentModel.findByIdAndRemove(req.params.id);
  if (!data) return res.status(404).json('The data with the given ID was not found.');
  res.json(data);
};

exports.getResourceById = async (req, res) => {
  const resource = await getCurrentResource(resources.genericTables, req.baseUrl.substring(4));
  const currentModel = await getModel(resource);
  let data = await currentModel.findById(req.params.id);
  if (!data) return res.status(404).json('The data with the given ID was not found.');

  res.json({
    resources: data,
    resource_name: resource.name,
    display_name: resource.display_name,
    table_column: resource.admin_table_column,
    actions: resource.admin_table_actions,
  });
};

const getCurrentResource = async (resources, base_url) => {
  return await resources.find(resource => {
    if (resource.name == base_url) return resource;
  });
};

const getDataToCreateOrSave = async (body, data_base_columns) => {
  let dataToCreateOrSave = {}
  for (const [key, value] of Object.entries(data_base_columns)) {
    dataToCreateOrSave[key] = body[key]
  }
  return dataToCreateOrSave;
};
