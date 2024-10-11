//This is a routing file which redirects endpoints to various services 

const express = require("express");
const router = express.Router();

const toolSearchService = require("../services/toolSearchService");
const toolSortService = require("../services/toolSortService");
const toolFilterService = require("../services/toolFilterService");
const toolBasicRetrievalService = require("../services/toolBasicRetrievalService");
const toolAddService = require("../services/toolAddService"); 
const toolsModel = require("../models/toolsModel"); 

// GET request to fetch all software without any conditions
router.get("/all", async (req, res) => {

  try {
    const tools = await toolBasicRetrievalService.getAllTools();
    res.json(tools);
  } catch (err) {
    console.error("Error fetching all tools:", err);
    res.status(500).json({ error: "Failed to fetch all tools" });
  }
});

// GET request to handle combined query for search, filter, and sort
router.get("/query", async (req, res) => {
  try {
    const { search, sort, order, ...filters } = req.query;
    let state = { conditions: [], params: [], tools: [] };

    if (!search && !sort && Object.keys(filters).length === 0) {
      state.tools = await toolBasicRetrievalService.getAllTools();
    } else {
      //Filtering
      if (Object.keys(filters).length > 0) {
        const filterResult = await toolFilterService.filterTools(filters);
        state.tools = filterResult.tools;
        state.conditions = filterResult.conditions;
        state.params = filterResult.params;
      } else {
        // If no filtering is done, fetch all tools as the starting point
        state.tools = await toolBasicRetrievalService.getAllTools();
      }

      // Searching
      if (search) {
        const searchResult = await toolSearchService.searchTools(search, state.conditions, state.params);
        state.tools = searchResult.tools;
        state.conditions = searchResult.conditions;
        state.params = searchResult.params;
      }

      // Sorting
      if (sort && order) {
        state.tools = await toolSortService.sortTools(sort, order, state.conditions, state.params);
      }
    }

    res.json(state.tools);
  } catch (err) {
    console.error("Error processing query:", err);
    res.status(500).json({ error: "Failed to process query" });
  }
});

// POST request to add a new software
router.post("/tool-add", async (req, res) => {

  try {
    const toolData = req.body;
    await toolAddService.addTool(toolData);
    res.status(201).json({ message: "Tool added successfully!" });
  } catch (err) {
    console.error("Error adding tool:", err);
    res.status(500).json({ error: "Failed to add tool" });
  }
});

//function to fetch distinct planning functionality types
const getDistinctPlanningTypes = async () => {
  return await toolsModel.fetchDistinctPlanningTypes();
};

// GET request to fetch distinct planning functionality types
router.get("/planning-types", async (req, res) => {

  try {
    const planningTypes = await getDistinctPlanningTypes();
    res.json(planningTypes);
  } catch (err) {
    console.error("Error fetching planning types:", err);
    res.status(500).json({ error: "Failed to fetch planning types" });
  }
});

module.exports = router;

