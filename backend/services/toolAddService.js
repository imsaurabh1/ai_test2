//Add Service

const toolsModel = require("../models/toolsModel");
const { v4: uuidv4 } = require("uuid");
const { sendToolAddedEmail } = require("../utils/emailUtils");

// Function to add a new software
const addTool = async (toolData) => {
  const toolId = uuidv4();
  const calculateExcellenceScore = () => {
    return (
      (toolData.shortName ? 1 : 0) * 0.5 +
      (toolData.longName ? 1 : 0) * 0.7 +
      (toolData.contributors ? 1 : 0) * 0.5 +
      (toolData.year ? 1 : 0) * 0.6 +
      (toolData.lastCommit ? 1 : 0) * 0.4 +
      (toolData.documentation ? 1 : 0) * 0.6 +
      (toolData.explanationAbstract ? 1 : 0) * 0.8 +
      (toolData.plannerReferences ? 1 : 0) * 0.5 +
      (toolData.executable ? 1 : 0) * 0.5 +
      (toolData.sourceCode ? 1 : 0) * 0.7 +
      (toolData.implementationLanguages ? 1 : 0) * 0.4 +
      (toolData.operatingSystems ? 1 : 0) * 0.3 +
      (toolData.environmentNotes ? 1 : 0) * 0.2 +
      (toolData.planningLanguage ? 1 : 0) * 0.5 +
      (toolData.planningClasses ? 1 : 0) * 0.4 +
      (toolData.planningType ? 1 : 0) * 0.4
    );
  };

  const excellenceScore = calculateExcellenceScore();

  // Insert software into the database
  await toolsModel.insertTool(toolId, {
    ...toolData,
    excellenceScore,
  });

  // Send email notification
  await sendToolAddedEmail(toolData.userEmail, toolData, toolId);
};

module.exports = {
  addTool,
};
