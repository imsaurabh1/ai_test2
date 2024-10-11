//Add Software Component

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Autocomplete } from "@mui/material";

import dayjs from "dayjs";
import { IconButton, TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const AddTool = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const [formData, setFormData] = useState({
    shortName: "",
    longName: "",
    contributors: [],
    year: "",
    lastCommit: "",
    explanationAbstract: "",
    plannerReferences: [],
    documentation: "",
    executable: "",
    sourceCode: "",
    implementationLanguages: [],
    operatingSystems: [],
    environmentNotes: "",
    planningLanguage: [],
    planningClasses: [],
    planningType: [],
  });

  const [errors, setErrors] = useState({});
   // eslint-disable-next-line 
  const [selectedDate, setSelectedDate] = useState(null);

  const operatingSystemSuggestions = ["Windows", "Linux", "Mac"];
  const planningTypeSuggestions = [
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

  const implementationLanguageSuggestions = [
    "JavaScript",
    "Python",
    "Java",
    "C++",
    "Ruby",
    "Go",
    "Swift",
    "Kotlin",
    "TypeScript",
    "Rust",
  ];

  const planningLanguageSuggestions = [
    "RDDL",
    "HDDL",
    "PDDL",
    "PDDL 2.1",
    "PDDL 2.2",
    "PDDL 3",
    "PDDL+",
  ];

  const planningClassSuggestions = [
    "Classical",
    "Numerical",
    "Temporal",
    "HTN",
    "Probabilistic",
    "Conformant",
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (state?.formData) {
      const loadedFormData = {
        ...state.formData,
        shortName: state.formData.shortName || "",
        longName: state.formData.longName || "",
        lastCommit: state.formData.lastCommit || "",
        explanationAbstract: state.formData.explanationAbstract || "",
        documentation: state.formData.documentation || "",
        executable: state.formData.executable || "",
        sourceCode: state.formData.sourceCode || "",
        environmentNotes: state.formData.environmentNotes || "",
        contributors:
          typeof state.formData.contributors === "string"
            ? state.formData.contributors
                .split(",")
                .map((contributor) => contributor.trim())
                .filter(Boolean)
            : state.formData.contributors,


            implementationLanguages:
          typeof state.formData.implementationLanguages === "string"
            ? state.formData.implementationLanguages
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean)
            : state.formData.implementationLanguages || [],
        operatingSystems:
          typeof state.formData.operatingSystems === "string"
            ? state.formData.operatingSystems
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean)
            : state.formData.operatingSystems || [],
        planningType:
          typeof state.formData.planningType === "string"
            ? state.formData.planningType
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean)
            : state.formData.planningType || [],
        planningLanguage:
          typeof state.formData.planningLanguage === "string"
            ? state.formData.planningLanguage
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean)
            : state.formData.planningLanguage || [],
        planningClasses:
          typeof state.formData.planningClasses === "string"
            ? state.formData.planningClasses
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean)
            : state.formData.planningClasses || [],
        plannerReferences:
          typeof state.formData.plannerReferences === "string"
            ? state.formData.plannerReferences
                .split(";")
                .map((item) => item.trim())
                .filter(Boolean) // Ensure no empty values
            : state.formData.plannerReferences || [], 
      };

      setFormData(loadedFormData);

      if (state.formData.year) {
        setSelectedDate(dayjs(state.formData.year));
      }
    }
  }, [state]);

  // Validation for all inputs
  const validateField = (name, value) => {
    const currentYear = new Date().getFullYear(); 

    if (value === null || value === undefined || value === "") {
      if (name === "longName" || name === "shortName") {

        if (!formData.shortName.trim() && !formData.longName.trim()) {
          return "Either Long name or Short name is required";
        }

        if (!value.trim()) {
          if (name === "shortName" && !formData.longName.trim()) {
            return "Short name is required";
          }
          if (name === "longName" && !formData.shortName.trim()) {
            return "Long name is required";
          }
        }
        return "";
      } else {
        return "";
      }
    }

    if (Array.isArray(value)) {
      switch (name) {
        case "contributors":
          if (value.join(", ").length > 255) {
            return "Contributors (without delimiters) cannot exceed 255 characters";
          }
          return "";

        case "plannerReferences":
          if (value.join("; ").length > 255) {
            return "Planner References (without delimiters) cannot exceed 255 characters";
          }
          return "";

        case "operatingSystems":
          if (value.join(", ").length > 50) {
            return "Operating Systems (without delimiters) cannot exceed 50 characters";
          }
          return "";

        case "implementationLanguages":
          if (value.join(", ").length > 100) {
            return "Implementation Languages (without delimiters) cannot exceed 100 characters";
          }
          return "";

        case "planningLanguage":
          if (value.join(", ").length > 50) {
            return "Planning Languages (without delimiters) cannot exceed 50 characters";
          }
          return "";

        case "planningClasses":
          if (value.join(", ").length > 100) {
            return "Planning Classes (without delimiters) cannot exceed 100 characters";
          }
          return "";

        case "planningType":
          if (value.join(", ").length > 100) {
            return "Planning Types (without delimiters) cannot exceed 100 characters";
          }
          return "";

        default:
          return ""; 
      }
    }

    switch (name) {
      case "shortName":
        return value.length > 50
          ? "Short name cannot exceed 50 characters"
          : value.trim() === ""
          ? "Short name is required"
          : "";

      case "longName":
        return value.length > 100
          ? "Long name cannot exceed 100 characters"
          : value.trim() === ""
          ? "Long name is required"
          : "";

      case "year": {
        // Ensure the value is a 4-digit number and within the valid range
        if (
          value.length !== 4 ||
          isNaN(value) ||
          value < 1900 ||
          value > currentYear
        ) {
          return `Year must be a 4-digit number between 1900 and ${currentYear}`;
        }
        return "";
      }

      case "lastCommit":
        return value.length > 255
          ? "Last commit URL cannot exceed 255 characters"
          : isNaN(Date.parse(value))
          ? "Last commit must be a valid date in YYYY-MM-DD format"
          : "";

          case "documentation":
          case "executable":
          case "sourceCode":
              try {
                //check if it's a valid URL
                new URL(value);
              } catch {
                return `Invalid URL for ${name}`;
              }
            
              if (value.length > 255) {
                return `${name} URL cannot exceed 255 characters`;
              }
            
              return "";
            

      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => {
        const currentClasses = prevData[name]
          .split(",")
          .map((item) => item.trim());
        const newClasses = checked
          ? [...currentClasses, value].filter(Boolean)
          : currentClasses.filter((classValue) => classValue !== value);

        return {
          ...prevData,
          [name]: newClasses.join(", "),
        };
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const renderField = (key) => {
    const error = errors[key] || "";
    const borderColor = error ? "border-red-500" : "border-gray-300";
    switch (key) {
      
      //shortName input field
      case "shortName":
        return (
          <div key={key} className="mb-4">
            <label className="block mb-1" htmlFor={key}>
              Short Name:
            </label>
            <input
              type="text"
              name={key}
              id={key}
              value={formData[key]}
              onChange={handleChange}
              placeholder="Enter Short Name" 
              className={`w-full px-3 py-2 border ${borderColor} rounded-md shadow-sm focus:outline-none focus:ring-green-600 focus:border-green-600`}
            />
            {error && <p className="text-red-500">{error}</p>}
          </div>
        );

      //longName input field
      case "longName":
        return (
          <div key={key} className="mb-4">
            <label className="block mb-1" htmlFor={key}>
              Long Name:
            </label>
            <input
              type="text"
              name={key}
              id={key}
              value={formData[key]}
              onChange={handleChange}
              placeholder="Enter Long Name" 
              className={`w-full px-3 py-2 border ${borderColor} rounded-md shadow-sm focus:outline-none focus:ring-green-600 focus:border-green-600`}
            />
            {error && <p className="text-red-500">{error}</p>}
          </div>
        );
      
        //executable input field
        case "executable":
        return (
          <div key={key} className="mb-4">
            <label className="block mb-1" htmlFor={key}>
              Executable:
            </label>
            <input
              type="text"
              name={key}
              id={key}
              value={formData.executable || ""}
              onChange={handleChange}
              placeholder="Enter Executable URL" 
              className={`w-full px-3 py-2 border ${borderColor} rounded-md shadow-sm focus:outline-none focus:ring-green-600 focus:border-green-600`}
            />
            {errors.executable && (
              <p className="text-red-500">{errors.executable}</p>
            )}
          </div>
        );

      //explanation abstract input field
        case "explanationAbstract":
        return (
          <div key={key} className="mb-4">
            <label className="block mb-1" htmlFor={key}>
              Explanation Abstract:
            </label>
            <input
              type="text"
              name={key}
              id={key}
              value={formData[key]}
              onChange={handleChange}
              placeholder="Enter Explanation Abstract" 
              className={`w-full px-3 py-2 border ${borderColor} rounded-md shadow-sm focus:outline-none focus:ring-green-600 focus:border-green-600`}
            />
            {error && <p className="text-red-500">{error}</p>}
          </div>
        );

      //documentation field
        case "documentation":
        return (
          <div key={key} className="mb-4">
            <label className="block mb-1" htmlFor={key}>
              Documentation:
            </label>
            <input
              type="text"
              name={key}
              id={key}
              value={formData[key]}
              onChange={handleChange}
              placeholder="Enter Documentation URL" 
              className={`w-full px-3 py-2 border ${borderColor} rounded-md shadow-sm focus:outline-none focus:ring-green-600 focus:border-green-600`}
            />
            {error && <p className="text-red-500">{error}</p>}
          </div>
        );

      //sourceCode field
        case "sourceCode":
        return (
          <div key={key} className="mb-4">
            <label className="block mb-1" htmlFor={key}>
              Source Code:
            </label>
            <input
              type="text"
              name={key}
              id={key}
              value={formData[key]}
              onChange={handleChange}
              placeholder="Enter Source Code URL" 
              className={`w-full px-3 py-2 border ${borderColor} rounded-md shadow-sm focus:outline-none focus:ring-green-600 focus:border-green-600`}
            />
            {error && <p className="text-red-500">{error}</p>}
          </div>
        );

      //enviromentNotes input field
        case "environmentNotes":
        return (
          <div key={key} className="mb-4">
            <label className="block mb-1" htmlFor={key}>
              Environment Notes:
            </label>
            <input
              type="text"
              name={key}
              id={key}
              value={formData[key]}
              onChange={handleChange}
              placeholder="Enter Environment Dependencies" 
              className={`w-full px-3 py-2 border ${borderColor} rounded-md shadow-sm focus:outline-none focus:ring-green-600 focus:border-green-600`}
            />
            {error && <p className="text-red-500">{error}</p>}
          </div>
        );

      //last commit input field
        case "lastCommit":
        return (
          <div key={key} className="mb-4">
            <label className="block mb-1" htmlFor={key}>
              Last Commit:
            </label>
            <input
              type="text"
              name={key}
              id={key}
              value={formData.lastCommit || ""}
              onChange={(e) => {// for formatting as 2020-10-08
                let value = e.target.value.replace(/\D/g, ""); 

                if (value.length > 4) {
                  value = value.slice(0, 4) + "-" + value.slice(4); 
                }
                if (value.length > 7) {
                  value = value.slice(0, 7) + "-" + value.slice(7, 9); 
                }

                setFormData((prevData) => ({
                  ...prevData,
                  lastCommit: value, 
                }));
              }}
              placeholder="YYYY-MM-DD"
              maxLength={10} // Maximum length for YYYY-MM-DD format
              className={`w-full px-3 py-2 border ${borderColor} rounded-md shadow-sm focus:outline-none focus:ring-green-600 focus:border-green-600`}
            />
            {errors.lastCommit && (
              <p className="text-red-500">{errors.lastCommit}</p>
            )}
          </div>
        );

      //year input field
      case "year":
        return (
          <div key={key} className="mb-4 relative">
            <label className="block mb-1" htmlFor={key}>
              Year:
            </label>
            <TextField
              name={key}
              id={key}
              type="text"
              placeholder="YYYY" 
              value={formData.year || ""}
              onChange={(e) => {
                const value = e.target.value;
                // To allow only numeric input and to ensure it's 4 digits or less
                if (/^\d{0,4}$/.test(value)) {
                  setFormData((prevData) => ({
                    ...prevData,
                    year: value,
                  }));
                }
              }}
              className={`w-full px-3 py-2 border ${borderColor} rounded-md shadow-sm`}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "green", 
                  },
                },
              }}
            />
            {errors.year && <p className="text-red-500">{errors.year}</p>}{" "}
            {}
          </div>
        );

      // Contributors field
      case "contributors":
        return (
          <div key={key} className="mb-4">
            <label className="block mb-1" htmlFor="contributors-autocomplete">
              Contributors:
            </label>

            <Autocomplete
              multiple
              id="contributors-autocomplete"
              options={[]} 
              freeSolo
              value={formData.contributors || []} 
              onChange={(event, newValue) => {
                setFormData((prevData) => ({
                  ...prevData,
                  contributors: newValue,
                }));
              }}
              ListboxProps={{
                sx: {
                  "& .MuiAutocomplete-option.Mui-focused": {
                    backgroundColor: "#d0f0c0", 
                    color: "black",
                  },
                  "& .MuiAutocomplete-option[aria-selected='true']": {
                    backgroundColor: "#d0f0c0", 
                    color: "black",
                  },
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "green", 
                  },
                  "&:hover fieldset": {
                    borderColor: "darkgreen", 
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "green", 
                  },
                },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Enter Contributor/s"
                />
              )}
            />

            {error && <p className="text-red-500">{error}</p>}
          </div>
        );
      
        //planningLanguage input field
        case "planningLanguage":
        return (
          <div key={key} className="mb-4">
            <label
              className="block mb-1"
              htmlFor="planningLanguages-autocomplete"
            >
              Planning Language:
            </label>

            <Autocomplete
              multiple
              id="planningLanguages-autocomplete"
              options={planningLanguageSuggestions} 
              freeSolo
              value={formData.planningLanguage || []} 
              onChange={(event, newValue) => {
                setFormData((prevData) => ({
                  ...prevData,
                  planningLanguage: newValue, 
                }));
              }}
              ListboxProps={{
                sx: {
                  "& .MuiAutocomplete-option.Mui-focused": {
                    backgroundColor: "#d0f0c0", 
                    color: "black",
                  },
                  "& .MuiAutocomplete-option[aria-selected='true']": {
                    backgroundColor: "#d0f0c0", 
                    color: "black",
                  },
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "green", 
                  },
                  "&:hover fieldset": {
                    borderColor: "darkgreen", 
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "green", 
                  },
                },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Enter Planning Language/s"
                />
              )}
            />
          </div>
        );

        //References input field
      case "plannerReferences":
        return (
          <div key={key} className="mb-4">
            <label
              className="block mb-1"
              htmlFor="plannerReferences-autocomplete"
            >
              Planning Software References:
            </label>

            <Autocomplete
              multiple
              id="plannerReferences-autocomplete"
              options={[]} 
              freeSolo
              value={formData.plannerReferences || []}
              onChange={(event, newValue) => {
                setFormData((prevData) => ({
                  ...prevData,
                  plannerReferences: newValue, 
                }));
              }}
              ListboxProps={{
                sx: {
                  "& .MuiAutocomplete-option.Mui-focused": {
                    backgroundColor: "#d0f0c0", 
                    color: "black",
                  },
                  "& .MuiAutocomplete-option[aria-selected='true']": {
                    backgroundColor: "#d0f0c0", 
                    color: "black",
                  },
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "green", 
                  },
                  "&:hover fieldset": {
                    borderColor: "darkgreen", 
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "green", 
                  },
                },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Enter Reference/s"
                />
              )}
            />
          </div>
        );

        //implementationLanguages input field
      case "implementationLanguages":
        return (
          <div key={key} className="mb-4">
            <label
              className="block mb-1"
              htmlFor="implementationLanguages-autocomplete"
            >
              Implementation Languages:
            </label>

            <Autocomplete
              multiple
              id="implementationLanguages-autocomplete"
              options={implementationLanguageSuggestions} 
              freeSolo
              value={formData.implementationLanguages || []} 
              onChange={(event, newValue) => {
                setFormData((prevData) => ({
                  ...prevData,
                  implementationLanguages: newValue, 
                }));
              }}
              ListboxProps={{
                sx: {
                  "& .MuiAutocomplete-option.Mui-focused": {
                    backgroundColor: "#d0f0c0",
                    color: "black",
                  },
                  "& .MuiAutocomplete-option[aria-selected='true']": {
                    backgroundColor: "#d0f0c0", 
                    color: "black",
                  },
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "green", 
                  },
                  "&:hover fieldset": {
                    borderColor: "darkgreen", 
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "green", 
                  },
                },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Enter Implementation Language/s"
                />
              )}
            />

            {error && <p className="text-red-500">{error}</p>}
          </div>
        );

      // Operating Systems input field 
      case "operatingSystems":
        return (
          <div key={key} className="mb-4">
            <label
              className="block mb-1"
              htmlFor="operatingSystems-autocomplete"
            >
              Operating Systems:
            </label>

            <Autocomplete
              multiple
              id="operatingSystems-autocomplete"
              options={operatingSystemSuggestions} 
              freeSolo 
              value={formData.operatingSystems || []} 
              onChange={(event, newValue) => {
                setFormData((prevData) => ({
                  ...prevData,
                  operatingSystems: newValue, 
                }));
              }}
              ListboxProps={{
                sx: {
                  "& .MuiAutocomplete-option.Mui-focused": {
                    backgroundColor: "#d0f0c0", 
                    color: "black",
                  },
                  "& .MuiAutocomplete-option[aria-selected='true']": {
                    backgroundColor: "#d0f0c0", 
                    color: "black",
                  },
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "green", 
                  },
                  "&:hover fieldset": {
                    borderColor: "darkgreen", 
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "green", 
                  },
                },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Enter Operating System/s"
                />
              )}
            />
          </div>
        );

      //  planningType input field
      case "planningType":
        return (
          <div key={key} className="mb-4">
            <label className="block mb-1" htmlFor="planningType-autocomplete">
              Planning Type:
            </label>

            <Autocomplete
              multiple
              id="planningType-autocomplete"
              options={planningTypeSuggestions}
              freeSolo
              value={formData.planningType || []} 
              onChange={(event, newValue) => {
                setFormData((prevData) => ({
                  ...prevData,
                  planningType: newValue, 
                }));
              }}
              ListboxProps={{
                sx: {
                  "& .MuiAutocomplete-option.Mui-focused": {
                    backgroundColor: "#d0f0c0", 
                    color: "black",
                  },
                  "& .MuiAutocomplete-option[aria-selected='true']": {
                    backgroundColor: "#d0f0c0", 
                    color: "black",
                  },
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "green", 
                  },
                  "&:hover fieldset": {
                    borderColor: "darkgreen", 
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "green", 
                  },
                },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Enter Planning Type/s"
                />
              )}
            />

            {error && <p className="text-red-500">{error}</p>}
          </div>
        );

      //planningClasses input field
        case "planningClasses":
        return (
          <div key={key} className="mb-4">
            <label
              className="block mb-1"
              htmlFor="planningClasses-autocomplete"
            >
              Planning Classes:
            </label>

            <Autocomplete
              multiple
              id="planningClasses-autocomplete"
              options={planningClassSuggestions} 
              freeSolo
              value={formData.planningClasses || []} 
              onChange={(event, newValue) => {
                setFormData((prevData) => ({
                  ...prevData,
                  planningClasses: newValue, 
                }));
              }}
              ListboxProps={{
                sx: {
                  "& .MuiAutocomplete-option.Mui-focused": {
                    backgroundColor: "#d0f0c0", 
                    color: "black",
                  },
                  "& .MuiAutocomplete-option[aria-selected='true']": {
                    backgroundColor: "#d0f0c0", 
                    color: "black",
                  },
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "green", 
                  },
                  "&:hover fieldset": {
                    borderColor: "darkgreen", 
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "green", 
                  },
                },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Select or Enter Planning Class/es"
                />
              )}
            />
          </div>
        );
      default:
        return (
          <div key={key} className="mb-4">
            <label className="block mb-1" htmlFor={key}>
              {key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
              :
            </label>
            <input
              type="text"
              name={key}
              id={key}
              value={formData[key]}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${borderColor} rounded-md shadow-sm focus:outline-none focus:ring-green-600 focus:border-green-600`}
            />
            {error && <p className="text-red-500">{error}</p>}
          </div>
        );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Convert array to comma or semicolon separated string before submission
      const formattedFormData = {
        ...formData,
        contributors:
          (formData.contributors || []).length > 0
            ? formData.contributors.join(", ")
            : null,
        implementationLanguages:
          (formData.implementationLanguages || []).length > 0
            ? formData.implementationLanguages.join(", ")
            : null,
        operatingSystems:
          (formData.operatingSystems || []).length > 0
            ? formData.operatingSystems.join(", ")
            : null,
        planningType:
          (formData.planningType || []).length > 0
            ? formData.planningType.join(", ")
            : null,
        planningLanguage:
          (formData.planningLanguage || []).length > 0
            ? formData.planningLanguage.join(", ")
            : null,
        planningClasses:
          (formData.planningClasses || []).length > 0
            ? formData.planningClasses.join(", ")
            : null,
        plannerReferences:
          (formData.plannerReferences || []).length > 0
            ? formData.plannerReferences.join("; ")
            : null,

        year: formData.year ? formData.year : null, 
        shortName: formData.shortName ? formData.shortName.trim() : null,
        longName: formData.longName ? formData.longName.trim() : null,
        lastCommit: formData.lastCommit ? formData.lastCommit.trim() : null,
        explanationAbstract: formData.explanationAbstract
          ? formData.explanationAbstract.trim()
          : null,
        documentation: formData.documentation
          ? formData.documentation.trim()
          : null,
        executable: formData.executable ? formData.executable.trim() : null,
        sourceCode: formData.sourceCode ? formData.sourceCode.trim() : null,
        environmentNotes: formData.environmentNotes
          ? formData.environmentNotes.trim()
          : null,
      };

      navigate("/confirm-tool", { state: { formData: formattedFormData } });
    }
  };

  return (
    <div className="p-6 relative">
      <div className="flex items-center mb-4">
        <IconButton
          onClick={() => navigate("/")}
          style={{ marginRight: "16px" }}
          sx={{
            backgroundColor: "#e0e0e0",
            "&:hover": {
              backgroundColor: "#bdbdbd",
            },
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <h2 className="text-2xl font-bold">Add New AI Planning Software</h2>
      </div>
      <form onSubmit={handleSubmit}>
        {renderField("shortName")}
        {renderField("longName")}
        {renderField("year")}

        {renderField("contributors")}
        {renderField("lastCommit")}
        {renderField("explanationAbstract")}
        {renderField("plannerReferences")}
        {renderField("documentation")}
        {renderField("executable")}
        {renderField("sourceCode")}
        {renderField("operatingSystems")}
        {renderField("environmentNotes")}
        {renderField("implementationLanguages")}
        {renderField("planningLanguage")}
        {renderField("planningClasses")}
        {renderField("planningType")}

        <button type="submit" className="px-4 py-2 btn-primary rounded">
          Next
        </button>
      </form>
    </div>
  );
};

export default AddTool;
