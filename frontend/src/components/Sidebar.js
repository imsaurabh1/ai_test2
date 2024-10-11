//Sidebar | Filter Component

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({
  selectedLanguages,
  setSelectedLanguages,
  selectedExcellenceScore,
  setSelectedExcellenceScore,
  selectedContributors,
  setSelectedContributors,
  selectedOperatingSystems,
  setSelectedOperatingSystems,
  selectedPlanningClasses,
  setSelectedPlanningClasses,
  selectedPlanningTypes,
  setSelectedPlanningTypes,
  availablePlanningTypes,
  selectedDocumentation,
  setSelectedDocumentation,
  selectedExplanationAbstract,
  setSelectedExplanationAbstract,
  selectedPlannerReferences,
  setSelectedPlannerReferences,
  selectedExecutable,
  setSelectedExecutable,
  selectedSourceCode,
  setSelectedSourceCode,
  selectedEnvironmentNotes,
  setSelectedEnvironmentNotes,
  selectedImplementationLanguage,
  setSelectedImplementationLanguage,
  children,
}) => {
  const navigate = useNavigate();

  const [openDrawer, setOpenDrawer] = useState(null);

  const toggleDrawer = (drawer) => {
    setOpenDrawer(openDrawer === drawer ? null : drawer);
  };
  const isFilterActive = (selectedValues) =>
    selectedValues && selectedValues.length > 0;

  const handleCheckboxChange = (setState, state) => {
    setState(!state);
  };

  const allPlanningTypes = [
    "Modelling",
    "Knowledge Learning",
    "Parsing",
    "Conversion",
    "Problem Generation",
    "Solving",
    "Searching",
    "Learning",
    "Strategising",
    "Translation",
    "Execution",
    "Monitoring",
    "Tolerance",
    "Plan Validation",
    "Explanation",
    "Visualisation",
    "Data",
    "System Management",
    "System Monitoring",
  ];

  const handleMultiSelectChange = (value, setState) => {
    setState((prevSelected) => {
      if (prevSelected.includes(value)) {
        return prevSelected.filter((item) => item !== value);
      } else {
        return [...prevSelected, value];
      }
    });
  };

  return (
    <aside className="sidebar min-h-full w-64 z-50">
      <button
        onClick={() => navigate("/add-tool")}
        style={{ display: "block", position: "relative", zIndex: 10 }}
        className="mb-4 ml-1 mt-4 px-4 py-2 btn-primary-add rounded"
      >
        <i className="fa fa-plus"></i>Add AI Planning Software
      </button>
      <div className="sidebar-header">Filter</div>
      <div className="p-4">
        {/* Planning Languages Filter */}
        <div className="sidebar-item mb-4">
          <h3
            className={`font-semibold mb-2 filter-header ${
              openDrawer === "planningLanguages" ||
              isFilterActive(selectedLanguages)
                ? "active"
                : ""
            }`}
            onClick={() => toggleDrawer("planningLanguages")}
          >
            Planning Languages
          </h3>
          <div
            className={`filter-drawer ${
              openDrawer === "planningLanguages" ? "open" : ""
            }`}
          >
            {["HDDL", "PDDL", "RDDL"].map((language) => (
              <label key={language} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  value={language}
                  checked={selectedLanguages.includes(language)}
                  onChange={() =>
                    handleMultiSelectChange(language, setSelectedLanguages)
                  }
                  className="sidebar-checkbox mr-2"
                />
                {language}
              </label>
            ))}
          </div>
        </div>

        {/* Excellence Score Filter */}
        <div className="sidebar-item mb-4">
          <h3
            className={`font-semibold mb-2 filter-header ${
              openDrawer === "excellenceScore" ||
              isFilterActive(selectedExcellenceScore)
                ? "active"
                : ""
            }`}
            onClick={() => toggleDrawer("excellenceScore")}
          >
            Excellence Score
          </h3>
          <div
            className={`filter-drawer ${
              openDrawer === "excellenceScore" ? "open" : ""
            }`}
          >
            {["Excellent", "Good", "Average", "Poor", "Bad"].map((score) => (
              <label key={score} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  value={score}
                  checked={selectedExcellenceScore.includes(score)}
                  onChange={() =>
                    handleMultiSelectChange(score, setSelectedExcellenceScore)
                  }
                  className="sidebar-checkbox mr-2"
                />
                {score}
              </label>
            ))}
          </div>
        </div>

        {/* Contributors Filter */}
        <div className="sidebar-item mb-4">
          <h3
            className={`font-semibold mb-2 filter-header ${
              openDrawer === "contributors" || selectedContributors
                ? "active"
                : ""
            }`}
            onClick={() => toggleDrawer("contributors")}
          >
            Contributors Listed
          </h3>
          <div
            className={`filter-drawer ${
              openDrawer === "contributors" ? "open" : ""
            }`}
          >
            <label className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={selectedContributors}
                onChange={() =>
                  handleCheckboxChange(
                    setSelectedContributors,
                    selectedContributors
                  )
                }
                className="sidebar-checkbox mr-2"
              />
              Yes
            </label>
          </div>
        </div>

        {/* Operating System Filter */}
        <div className="sidebar-item mb-4">
          <h3
            className={`font-semibold mb-2 filter-header ${
              openDrawer === "operatingSystems" ||
              isFilterActive(selectedOperatingSystems)
                ? "active"
                : ""
            }`}
            onClick={() => toggleDrawer("operatingSystems")}
          >
            Operating System
          </h3>
          <div
            className={`filter-drawer ${
              openDrawer === "operatingSystems" ? "open" : ""
            }`}
          >
            {["Windows", "Linux", "Mac"].map((os) => (
              <label key={os} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  value={os}
                  checked={selectedOperatingSystems.includes(os)}
                  onChange={() =>
                    handleMultiSelectChange(os, setSelectedOperatingSystems)
                  }
                  className="sidebar-checkbox mr-2"
                />
                {os}
              </label>
            ))}
          </div>
        </div>

        {/* Planning Classes Filter */}
        <div className="sidebar-item mb-4">
          <h3
            className={`font-semibold mb-2 filter-header ${
              openDrawer === "planningClasses" ||
              isFilterActive(selectedPlanningClasses)
                ? "active"
                : ""
            }`}
            onClick={() => toggleDrawer("planningClasses")}
          >
            Planning Classes
          </h3>
          <div
            className={`filter-drawer ${
              openDrawer === "planningClasses" ? "open" : ""
            }`}
          >
            {[
              "Classical",
              "Numerical",
              "Temporal",
              "HTN",
              "Probabilistic",
              "Conformant",
            ].map((classType) => (
              <label key={classType} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  value={classType}
                  checked={selectedPlanningClasses.includes(classType)}
                  onChange={() =>
                    handleMultiSelectChange(
                      classType,
                      setSelectedPlanningClasses
                    )
                  }
                  className="sidebar-checkbox mr-2"
                />
                {classType}
              </label>
            ))}
          </div>
        </div>

        {/* Planning Types Filter */}
        <div className="sidebar-item mb-4">
          <h3
            className={`font-semibold mb-2 filter-header ${
              openDrawer === "planningTypes" || selectedPlanningTypes.length > 0
                ? "active"
                : ""
            }`}
            onClick={() => toggleDrawer("planningTypes")}
          >
            Planning Types
          </h3>
          <div
            className={`filter-drawer ${
              openDrawer === "planningTypes" ? "open" : ""
            }`}
          >
            {allPlanningTypes.map((type) => (
              <label key={type} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  value={type}
                  disabled={!availablePlanningTypes.includes(type)}
                  checked={selectedPlanningTypes.includes(type)}
                  onChange={() =>
                    handleMultiSelectChange(type, setSelectedPlanningTypes)
                  }
                  className="sidebar-checkbox mr-2"
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        {/* Documentation Filter */}
        <div className="sidebar-item mb-4">
          <h3
            className={`font-semibold mb-2 filter-header ${
              openDrawer === "documentation" || selectedDocumentation
                ? "active"
                : ""
            }`}
            onClick={() => toggleDrawer("documentation")}
          >
            Documentation Available
          </h3>
          <div
            className={`filter-drawer ${
              openDrawer === "documentation" ? "open" : ""
            }`}
          >
            <label className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={selectedDocumentation}
                onChange={() =>
                  handleCheckboxChange(
                    setSelectedDocumentation,
                    selectedDocumentation
                  )
                }
                className="sidebar-checkbox mr-2"
              />
              Yes
            </label>
          </div>
        </div>

        {/* Explanation Abstract Filter */}
        <div className="sidebar-item mb-4">
          <h3
            className={`font-semibold mb-2 filter-header ${
              openDrawer === "explanationAbstract" ||
              selectedExplanationAbstract
                ? "active"
                : ""
            }`}
            onClick={() => toggleDrawer("explanationAbstract")}
          >
            Explanation Abstract Available
          </h3>
          <div
            className={`filter-drawer ${
              openDrawer === "explanationAbstract" ? "open" : ""
            }`}
          >
            <label className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={selectedExplanationAbstract}
                onChange={() =>
                  handleCheckboxChange(
                    setSelectedExplanationAbstract,
                    selectedExplanationAbstract
                  )
                }
                className="sidebar-checkbox mr-2"
              />
              Yes
            </label>
          </div>
        </div>

        {/* Planner References Filter */}
        <div className="sidebar-item mb-4">
          <h3
            className={`font-semibold mb-2 filter-header ${
              openDrawer === "plannerReferences" || selectedPlannerReferences
                ? "active"
                : ""
            }`}
            onClick={() => toggleDrawer("plannerReferences")}
          >
            Planning Software References Available
          </h3>
          <div
            className={`filter-drawer ${
              openDrawer === "plannerReferences" ? "open" : ""
            }`}
          >
            <label className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={selectedPlannerReferences}
                onChange={() =>
                  handleCheckboxChange(
                    setSelectedPlannerReferences,
                    selectedPlannerReferences
                  )
                }
                className="sidebar-checkbox mr-2"
              />
              Yes
            </label>
          </div>
        </div>

        {/* Executable Filter */}
        <div className="sidebar-item mb-4">
          <h3
            className={`font-semibold mb-2 filter-header ${
              openDrawer === "executable" || selectedExecutable ? "active" : ""
            }`}
            onClick={() => toggleDrawer("executable")}
          >
            Executable Available
          </h3>
          <div
            className={`filter-drawer ${
              openDrawer === "executable" ? "open" : ""
            }`}
          >
            <label className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={selectedExecutable}
                onChange={() =>
                  handleCheckboxChange(
                    setSelectedExecutable,
                    selectedExecutable
                  )
                }
                className="sidebar-checkbox mr-2"
              />
              Yes
            </label>
          </div>
        </div>

        {/* Source Code Filter */}
        <div className="sidebar-item mb-4">
          <h3
            className={`font-semibold mb-2 filter-header ${
              openDrawer === "sourceCode" || selectedSourceCode ? "active" : ""
            }`}
            onClick={() => toggleDrawer("sourceCode")}
          >
            Source Code Available
          </h3>
          <div
            className={`filter-drawer ${
              openDrawer === "sourceCode" ? "open" : ""
            }`}
          >
            <label className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={selectedSourceCode}
                onChange={() =>
                  handleCheckboxChange(
                    setSelectedSourceCode,
                    selectedSourceCode
                  )
                }
                className="sidebar-checkbox mr-2"
              />
              Yes
            </label>
          </div>
        </div>

        {/* Environment Notes Filter */}
        <div className="sidebar-item mb-4">
          <h3
            className={`font-semibold mb-2 filter-header ${
              openDrawer === "environmentNotes" || selectedEnvironmentNotes
                ? "active"
                : ""
            }`}
            onClick={() => toggleDrawer("environmentNotes")}
          >
            Environment Notes Available
          </h3>
          <div
            className={`filter-drawer ${
              openDrawer === "environmentNotes" ? "open" : ""
            }`}
          >
            <label className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={selectedEnvironmentNotes}
                onChange={() =>
                  handleCheckboxChange(
                    setSelectedEnvironmentNotes,
                    selectedEnvironmentNotes
                  )
                }
                className="sidebar-checkbox mr-2"
              />
              Yes
            </label>
          </div>
        </div>

        {/* Implementation Language Filter */}
        <div className="sidebar-item mb-4">
          <h3
            className={`font-semibold mb-2 filter-header ${
              openDrawer === "implementationLanguage" ||
              selectedImplementationLanguage
                ? "active"
                : ""
            }`}
            onClick={() => toggleDrawer("implementationLanguage")}
          >
            Implementation Language Available
          </h3>
          <div
            className={`filter-drawer ${
              openDrawer === "implementationLanguage" ? "open" : ""
            }`}
          >
            <label className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={selectedImplementationLanguage}
                onChange={() =>
                  handleCheckboxChange(
                    setSelectedImplementationLanguage,
                    selectedImplementationLanguage
                  )
                }
                className="sidebar-checkbox mr-2"
              />
              Yes
            </label>
          </div>
        </div>
        {children}
      </div>
    </aside>
  );
};

export default Sidebar;
