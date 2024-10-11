// hook for fetching data

import { useEffect, useRef } from "react";
import axios from "axios";

const useFetchTools = ({
  search,
  currentPage,
  sortOptions,
  sortOrder,
  selectedLanguages,
  selectedExcellenceScore,
  selectedContributors,
  selectedOperatingSystems,
  selectedPlanningClasses,
  selectedPlanningTypes,
  selectedDocumentation,
  selectedExplanationAbstract,
  selectedPlannerReferences,
  selectedExecutable,
  selectedSourceCode,
  selectedEnvironmentNotes,
  selectedImplementationLanguage,
  setTools,
  setLoading,
  setAvailablePlanningTypes,
}) => {
  const lastQueryRef = useRef({});

  useEffect(() => {
    const fetchTools = async () => {
      setLoading(true);
      try {
        const currentQuery = {
          search,
          sort: sortOptions || undefined,
          order: sortOrder || undefined,
          languages: selectedLanguages.length ? selectedLanguages.join(",") : undefined,
          excellenceScore: selectedExcellenceScore.length ? selectedExcellenceScore.join(",") : undefined,
          contributors: selectedContributors ? "yes" : undefined,
          operatingSystems: selectedOperatingSystems.length ? selectedOperatingSystems.join(",") : undefined,
          planningClasses: selectedPlanningClasses.length ? selectedPlanningClasses.join(",") : undefined,
          planningTypes: selectedPlanningTypes.length ? selectedPlanningTypes.join(",") : undefined,
          documentation: selectedDocumentation ? "yes" : undefined,
          explanationAbstract: selectedExplanationAbstract ? "yes" : undefined,
          plannerReferences: selectedPlannerReferences ? "yes" : undefined,
          executable: selectedExecutable ? "yes" : undefined,
          sourceCode: selectedSourceCode ? "yes" : undefined,
          environmentNotes: selectedEnvironmentNotes ? "yes" : undefined,
          implementationLanguage: selectedImplementationLanguage ? "yes" : undefined,
        };

        if (JSON.stringify(currentQuery) === JSON.stringify(lastQueryRef.current)) {
          setLoading(false);
          return;
        }

        lastQueryRef.current = currentQuery;

        // Fetch software data
        const toolsResponse = await axios.get("http://localhost:5000/tools/query", {
          params: currentQuery,
        });

        setTools(toolsResponse.data);

        // Fetch planning types
        fetchAvailablePlanningTypes();

      } catch (error) {
        console.error("Error fetching tools:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 200);
      }
    };

    const fetchAvailablePlanningTypes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/tools/planning-types");
        setAvailablePlanningTypes(response.data);
      } catch (error) {
        console.error("Error fetching planning types:", error.response?.data || error.message);
      }
    };

    fetchTools();
  }, [
    search,
    currentPage,
    sortOptions,
    sortOrder,
    selectedLanguages,
    selectedExcellenceScore,
    selectedContributors,
    selectedOperatingSystems,
    selectedPlanningClasses,
    selectedPlanningTypes,
    selectedDocumentation,
    selectedExplanationAbstract,
    selectedPlannerReferences,
    selectedExecutable,
    selectedSourceCode,
    selectedEnvironmentNotes,
    selectedImplementationLanguage,
    setTools,
    setLoading,
    setAvailablePlanningTypes,
  ]);
};

export default useFetchTools;
