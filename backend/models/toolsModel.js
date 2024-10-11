//This file is responsible to execute MySQL commmand on the database.

const db = require("../config/db");

//Get the software from db based on conditions, sorting and filtering
const fetchTools = (conditions = [], params = [], orderBy = "id", orderDirection = "ASC") => {
  let query = `SELECT * FROM ai_planning_softwares`;

  // Apply conditions if there are any
  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }
  // Apply sorting
  query += ` ORDER BY ${orderBy} ${orderDirection}`;

  return new Promise((resolve, reject) => {
    db.query(query, params, (err, results) => {
      if (err) {
        console.error("Error executing SQL query:", query, "with params:", params);
        return reject(err);
      }
      resolve(results);
    });
  });
};

// Fetch all data without any conditions
const fetchAllTools = () => {
  const query = `SELECT * FROM ai_planning_softwares ORDER BY id ASC`;

  return new Promise((resolve, reject) => {
    db.query(query, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

// Fetch distinct planning types from the database - this is responsible to get all distinct types of planning functionalities
//Used for filter sidebar 
const fetchDistinctPlanningTypes = () => {
  const query = `SELECT DISTINCT planningType FROM ai_planning_softwares WHERE planningType IS NOT NULL`;

  return new Promise((resolve, reject) => {
    db.query(query, (err, results) => {
      if (err) {
        return reject(err);
      }


      const allTypes = results
        .map(row => row.planningType.split(',').map(type => type.trim()))  
        .flat();  

      //unique planning functionality types
      const distinctTypes = [...new Set(allTypes)];

      resolve(distinctTypes);  
    });
  });
};

// Add a new software into the database
const insertTool = (toolId, toolData) => {
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
    excellenceScore,
  } = toolData;

  const query = `
    INSERT INTO ai_planning_softwares 
    (id, shortName, longName, contributors, year, lastCommit, documentation, 
    explanationAbstract, plannerReferences, executable, sourceCode, 
    implementationLanguage, operatingSystem, environmentNotes, planningLanguage, 
    planningClasses, planningType, insertedAt, excellenceScore) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?)
  `;

  const values = [
    toolId,
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
  ];

  return new Promise((resolve, reject) => {
    db.query(query, values, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

module.exports = {
  fetchTools,
  fetchAllTools,
  insertTool,
  fetchDistinctPlanningTypes
};
