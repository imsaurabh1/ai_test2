// Service File - Intermediate file for interacting with frontend and database executing

const toolsModel = require("../models/toolsModel");
const { v4: uuidv4 } = require("uuid");
const { sendToolAddedEmail } = require("../utils/emailUtils");

// Business logic to retrieve tools
const getTools = async (queryParams) => {
  const {
    search,
    sort,
    order,
    languages,
    excellenceScore,
    contributors,
    operatingSystems,
    planningClasses,
    planningTypes,
    documentation,
    explanationAbstract,
    plannerReferences,
    executable,
    sourceCode,
    environmentNotes,
    implementationLanguage,
  } = queryParams;

  let conditions = [];
  let params = [];

  // Search logic
  if (search) {
    conditions.push(`(
      shortName LIKE ? OR 
      longName LIKE ? OR 
      contributors LIKE ? OR 
      year LIKE ? OR 
      lastCommit LIKE ? OR 
      explanationAbstract LIKE ? OR 

      implementationLanguage LIKE ? OR 
      operatingSystem LIKE ? OR 
      environmentNotes LIKE ? OR 
      planningLanguage LIKE ? OR 
      planningClasses LIKE ? OR 
      planningType LIKE ?
    )`);
    params = Array(16).fill(`%${search}%`);
  }


        // plannerReferences LIKE ? OR 
      // documentation LIKE ? OR 
      // executable LIKE ? OR 
      // sourceCode LIKE ? OR 

  // Filter and sorting logic
  if (languages) {
  const languagesArray = languages.split(",").map((lang) => lang.trim());

  const orConditions = languagesArray.map((lang) => {
    if (lang === "PDDL") {
      return `planningLanguage LIKE ?`;
    } else {
      return `planningLanguage = ?`;
    }
  });

  // Join all conditions with OR
  conditions.push(`(${orConditions.join(" OR ")})`);

  // Add the corresponding parameters
  params.push(...languagesArray.map((lang) => (lang === "PDDL" ? "%PDDL%" : lang)));
}

  //Excellence Score filtering
  if (excellenceScore) {
    const scoreArray = excellenceScore
      .split(",")
      .map((score) => {
        switch (score) {
          case "Excellent":
            return "excellenceScore >= 7";
          case "Good":
            return "excellenceScore < 7 AND excellenceScore >= 5.5";
          case "Average":
            return "excellenceScore < 5.5 AND excellenceScore >= 4";
          case "Poor":
            return "excellenceScore < 4 AND excellenceScore >= 2.5";
          case "Bad":
            return "excellenceScore < 2.5";
          default:
            return null;
        }
      })
      .filter(Boolean);

    if (scoreArray.length > 0) {
      conditions.push(`(${scoreArray.join(" OR ")})`);
    }
  }

  // Contributors filter
  if (contributors === "yes") conditions.push(`contributors IS NOT NULL`);

  //OperatingSystem filter
  if (operatingSystems) {
    const osArray = operatingSystems.split(",").map((os) => os.trim());

    conditions.push(
      `(${osArray.map(() => `operatingSystem LIKE ?`).join(" OR ")})`
    );

    params.push(...osArray.map((os) => `%${os}%`));
  }

  //Planning Classes Filter
  if (planningClasses)
    if (planningClasses) {
      const classesArray = planningClasses.split(",").map((cls) => cls.trim());
      conditions.push(
        `(${classesArray.map(() => `planningClasses LIKE ?`).join(" OR ")})`
      );
      params.push(...classesArray.map((cls) => `%${cls}%`));
    }

  //PlanningTypes Filter
  if (planningTypes) {
    const typesArray = planningTypes.split(",").map((type) => type.trim());

    conditions.push(
      `(${typesArray.map(() => `planningType LIKE ?`).join(" OR ")})`
    );

    params.push(...typesArray.map((type) => `%${type}%`));
  }

  //Documentation Filter
  if (documentation === "yes") conditions.push(`documentation IS NOT NULL`);

  //ExplanationAbstract Filter
  if (explanationAbstract === "yes")
    conditions.push(`explanationAbstract IS NOT NULL`);

  //PlanningReference Filter
  if (plannerReferences === "yes")
    conditions.push(`plannerReferences IS NOT NULL`);

  //Executable Filter
  if (executable === "yes") conditions.push(`executable IS NOT NULL`);

  //SourceCode Filter
  if (sourceCode === "yes") conditions.push(`sourceCode IS NOT NULL`);

  //EnvironmentNotes Filter
  if (environmentNotes === "yes") {
    conditions.push(`environmentNotes IS NOT NULL`);
  }

  //ImplemenationLanguage Filter
  if (implementationLanguage === "yes") {
    conditions.push(`implementationLanguage IS NOT NULL`);
  }

  // Sorting logic
  let orderBy = "id";
  if (sort) {
    switch (sort) {
      case "year":
      case "excellenceScore":
      case "insertedAt":
        orderBy = sort;
        break;
    }
  }
  const orderDirection = order === "desc" ? "DESC" : "ASC";

  // Call database model to get tools
  const tools = await toolsModel.fetchTools(
    conditions,
    params,
    orderBy,
    orderDirection
  );
  return tools;
};

// Fetch distinct planning types
const getDistinctPlanningTypes = async () => {
  return await toolsModel.fetchDistinctPlanningTypes();
};


// Business logic to add a tool
const addTool = async (toolData) => {
  const toolId = uuidv4();

  const {
    shortName,
    longName,
    contributors,
    year,
    lastCommit,
    documentation,
    explanationAbstract,
    plannerReferences,
    executable,
    sourceCode,
    implementationLanguages,
    operatingSystems,
    environmentNotes,
    planningLanguage,
    planningClasses,
    planningType,
    userEmail,
  } = toolData;

  const calculateExcellenceScore = () => {
    return (
      (shortName ? 1 : 0) * 0.5 +
      (longName ? 1 : 0) * 0.7 +
      (contributors ? 1 : 0) * 0.5 +
      (year ? 1 : 0) * 0.6 +
      (lastCommit ? 1 : 0) * 0.4 +
      (documentation ? 1 : 0) * 0.6 +
      (explanationAbstract ? 1 : 0) * 0.8 +
      (plannerReferences ? 1 : 0) * 0.5 +
      (executable ? 1 : 0) * 0.5 +
      (sourceCode ? 1 : 0) * 0.7 +
      (implementationLanguages ? 1 : 0) * 0.4 +
      (operatingSystems ? 1 : 0) * 0.3 +
      (environmentNotes ? 1 : 0) * 0.2 +
      (planningLanguage ? 1 : 0) * 0.5 +
      (planningClasses ? 1 : 0) * 0.4 +
      (planningType ? 1 : 0) * 0.4
    );
  };

  const excellenceScore = calculateExcellenceScore();

  // Insert tool into the database
  await toolsModel.insertTool(toolId, {
    shortName,
    longName,
    contributors,
    year,
    lastCommit,
    documentation,
    explanationAbstract,
    plannerReferences,
    executable,
    sourceCode,
    implementationLanguages,
    operatingSystems,
    environmentNotes,
    planningLanguage,
    planningClasses,
    planningType,
    excellenceScore,
  });

  // Send email notification after successful insertion
  await sendToolAddedEmail(userEmail, toolData);
};

module.exports = {
  getTools,
  addTool,
  getDistinctPlanningTypes,
};
