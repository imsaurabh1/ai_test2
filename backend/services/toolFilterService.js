// Filtering Service

const toolsModel = require("../models/toolsModel");

const filterTools = async (queryParams) => {
  const {
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

  // Filtering by languages
  if (languages) {
    const languagesArray = languages.split(",").map(lang => lang.trim());
    const orConditions = languagesArray.map(lang => `planningLanguage LIKE ?`);
    conditions.push(`(${orConditions.join(" OR ")})`);
    params.push(...languagesArray.map(lang => `%${lang}%`));
  }

  // Filtering by excellence score
  if (excellenceScore) {
    const scoreArray = excellenceScore.split(",").map(score => {
      switch (score) {
        case "Excellent":
          return { condition: "excellenceScore >= ?", value: 7 };
        case "Good":
          return { condition: "excellenceScore < ? AND excellenceScore >= ?", value: [7, 5.5] };
        case "Average":
          return { condition: "excellenceScore < ? AND excellenceScore >= ?", value: [5.5, 4] };
        case "Poor":
          return { condition: "excellenceScore < ? AND excellenceScore >= ?", value: [4, 2.5] };
        case "Bad":
          return { condition: "excellenceScore < ?", value: 2.5 };
        default:
          return null;
      }
    }).filter(Boolean);

    if (scoreArray.length > 0) {
      const orConditions = scoreArray.map(score => score.condition);
      conditions.push(`(${orConditions.join(" OR ")})`);
      scoreArray.forEach(score => {
        if (Array.isArray(score.value)) {
          params.push(...score.value);
        } else {
          params.push(score.value);
        }
      });
    }
  }

  // Filtering by contributors
  if (contributors === "yes") {
    conditions.push(`contributors IS NOT NULL`);
  }

  // Filtering by operating systems
  if (operatingSystems) {
    const osArray = operatingSystems.split(",").map(os => os.trim());
    conditions.push(`(${osArray.map(() => `operatingSystem LIKE ?`).join(" OR ")})`);
    params.push(...osArray.map(os => `%${os}%`));
  }

  // Filtering by planning classes
  if (planningClasses) {
    const classesArray = planningClasses.split(",").map(cls => cls.trim());
    conditions.push(`(${classesArray.map(() => `planningClasses LIKE ?`).join(" OR ")})`);
    params.push(...classesArray.map(cls => `%${cls}%`));
  }

  // Filtering by planning types
  if (planningTypes) {
    const typesArray = planningTypes.split(",").map(type => type.trim());
    conditions.push(`(${typesArray.map(() => `planningType LIKE ?`).join(" OR ")})`);
    params.push(...typesArray.map(type => `%${type}%`));
  }

  // Filtering by documentation
  if (documentation === "yes") {
    conditions.push(`documentation IS NOT NULL`);
  }

  // Filtering by explanation abstract
  if (explanationAbstract === "yes") {
    conditions.push(`explanationAbstract IS NOT NULL`);
  }

  // Filtering by planner references
  if (plannerReferences === "yes") {
    conditions.push(`plannerReferences IS NOT NULL`);
  }

  // Filtering by executable
  if (executable === "yes") {
    conditions.push(`executable IS NOT NULL`);
  }

  // Filtering by source code
  if (sourceCode === "yes") {
    conditions.push(`sourceCode IS NOT NULL`);
  }

  // Filtering by environment notes
  if (environmentNotes === "yes") {
    conditions.push(`environmentNotes IS NOT NULL`);
  }

  // Filtering by implementation language
  if (implementationLanguage === "yes") {
    conditions.push(`implementationLanguage IS NOT NULL`);
  }

  const tools = await toolsModel.fetchTools(conditions, params);
  return { tools, conditions, params };
};

module.exports = {
  filterTools,
};
