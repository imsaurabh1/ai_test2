// Details Service
const toolsModel = require("../models/toolsModel");

const getAllTools = async () => {
  return await toolsModel.fetchAllTools();
};

module.exports = {
  getAllTools,
};
