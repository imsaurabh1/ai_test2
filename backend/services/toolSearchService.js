//Search Service

const toolsModel = require("../models/toolsModel");

const searchTools = async (search, conditions = [], params = []) => {
  // Build the search condition
  const searchCondition = `(shortName LIKE ? OR longName LIKE ? OR contributors LIKE ? OR 
                            year LIKE ? OR lastCommit LIKE ? OR explanationAbstract LIKE ? OR 
                            implementationLanguage LIKE ? OR operatingSystem LIKE ? OR 
                            environmentNotes LIKE ? OR planningLanguage LIKE ? OR 
                            planningClasses LIKE ? OR planningType LIKE ?)`;

  conditions.push(searchCondition);

  // Add the search term to the parameters array for each searchable field
  const searchTerm = `%${search}%`;
  params.push(
    searchTerm, searchTerm, searchTerm, searchTerm, searchTerm, 
    searchTerm, searchTerm, searchTerm, searchTerm, 
    searchTerm, searchTerm, searchTerm
  );

  const tools = await toolsModel.fetchTools(conditions, params);
  
  return { tools, conditions, params };
};

module.exports = {
  searchTools,
};
