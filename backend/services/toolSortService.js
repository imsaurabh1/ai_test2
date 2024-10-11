//Sort Service

const toolsModel = require("../models/toolsModel");

const sortTools = async (sort, order, conditions = [], params = []) => {
  let orderBy = "id";
  if (sort && ["year", "excellenceScore", "insertedAt"].includes(sort)) {
    orderBy = sort;
  }
  const orderDirection = order === "desc" ? "DESC" : "ASC";
  const tools = await toolsModel.fetchTools(conditions, params, orderBy, orderDirection);
  return tools;
};

module.exports = {
  sortTools,
};
