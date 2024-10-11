//Main File of frontend 

import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import ToolDetailsWrapper from "./components/ToolDetailsWrapper";
import AddTool from "./components/AddTool";
import ConfirmTool from "./components/ConfirmTool";
import AboutUs from "./components/AboutUs"
import PrivacyPolicy from "./components/PrivacyPolicy";
import Pagination from "./components/Pagination";
import SortDrawer from "./components/SortDrawer";
import Spinner from "./components/Spinner";
import ToolCard from "./components/ToolCard";
import useFetchTools from "./hooks/useFetchTools";

function App() {
  const [tools, setTools] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [toolsPerPage] = useState(12);
  const [sortOptions, setSortOptions] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedExcellenceScore, setSelectedExcellenceScore] = useState([]);
  const [selectedContributors, setSelectedContributors] = useState(false);
  const [selectedOperatingSystems, setSelectedOperatingSystems] = useState([]);
  const [selectedPlanningClasses, setSelectedPlanningClasses] = useState([]);
  const [selectedPlanningTypes, setSelectedPlanningTypes] = useState([]);
  const [selectedDocumentation, setSelectedDocumentation] = useState(false);
  const [selectedExplanationAbstract, setSelectedExplanationAbstract] = useState(false);
  const [selectedPlannerReferences, setSelectedPlannerReferences] = useState(false);
  const [selectedExecutable, setSelectedExecutable] = useState(false);
  const [selectedSourceCode, setSelectedSourceCode] = useState(false);
  const [selectedEnvironmentNotes, setSelectedEnvironmentNotes] = useState(false);
  const [selectedImplementationLanguage, setSelectedImplementationLanguage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [drawerHeight, setDrawerHeight] = useState(0);
  const [availablePlanningTypes, setAvailablePlanningTypes] = useState([]);  // New state



  const cardContainerStyle = {
    marginTop: `${drawerHeight}px`,
    transition: "margin-top 0.3s ease-in-out",
    minHeight: loading || tools.length === 0 ? "80vh" : "auto",
  };

  useFetchTools({
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
    setAvailablePlanningTypes,
    selectedDocumentation,
    selectedExplanationAbstract,
    selectedPlannerReferences,
    selectedExecutable,
    selectedSourceCode,
    selectedEnvironmentNotes,
    selectedImplementationLanguage,
    setTools,
    setLoading,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedLanguages, selectedExcellenceScore, selectedContributors, selectedOperatingSystems, selectedPlanningClasses, selectedPlanningTypes]);

  const navigate = useNavigate();
  const location = useLocation();
  const isToolDetailsPage = location.pathname.startsWith("/tools/");
  const isAddToolPage = location.pathname.startsWith("/add-tool");
  const isConfirmToolPage = location.pathname.startsWith("/confirm-tool");
  const isAboutUSPage = location.pathname.startsWith("/about-us");
  const isPrivacyPolicyPage = location.pathname.startsWith("/privacy-policy");


  const indexOfLastTool = currentPage * toolsPerPage;
  const indexOfFirstTool = indexOfLastTool - toolsPerPage;
  const currentTools = tools.slice(indexOfFirstTool, indexOfLastTool);
  const totalPages = Math.ceil(tools.length / toolsPerPage);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex flex-1">
        {!isToolDetailsPage && !isAddToolPage && !isConfirmToolPage && !isAboutUSPage && !isPrivacyPolicyPage && (
          <Sidebar
            selectedLanguages={selectedLanguages}
            setSelectedLanguages={setSelectedLanguages}
            selectedExcellenceScore={selectedExcellenceScore}
            setSelectedExcellenceScore={setSelectedExcellenceScore}
            selectedContributors={selectedContributors}
            setSelectedContributors={setSelectedContributors}
            selectedOperatingSystems={selectedOperatingSystems}
            setSelectedOperatingSystems={setSelectedOperatingSystems}
            selectedPlanningClasses={selectedPlanningClasses}
            setSelectedPlanningClasses={setSelectedPlanningClasses}
            selectedPlanningTypes={selectedPlanningTypes}
            setSelectedPlanningTypes={setSelectedPlanningTypes}
            availablePlanningTypes={availablePlanningTypes} 
            selectedDocumentation={selectedDocumentation}
            setSelectedDocumentation={setSelectedDocumentation}
            selectedExplanationAbstract={selectedExplanationAbstract}
            setSelectedExplanationAbstract={setSelectedExplanationAbstract}
            selectedPlannerReferences={selectedPlannerReferences}
            setSelectedPlannerReferences={setSelectedPlannerReferences}
            selectedExecutable={selectedExecutable}
            setSelectedExecutable={setSelectedExecutable}
            selectedSourceCode={selectedSourceCode}
            setSelectedSourceCode={setSelectedSourceCode}
            selectedEnvironmentNotes={selectedEnvironmentNotes}
            setSelectedEnvironmentNotes={setSelectedEnvironmentNotes}
            selectedImplementationLanguage={selectedImplementationLanguage}
            setSelectedImplementationLanguage={setSelectedImplementationLanguage}
          >
            
          </Sidebar>
        )}
        <main className="flex-1 p-4">
          <Routes>
            <Route
              path="/tools/:id"
              element={<ToolDetailsWrapper tools={tools} />}
            />
            <Route path="/add-tool" element={<AddTool />} />
            <Route path="/confirm-tool" element={<ConfirmTool />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route
              path="/"
              element={
                <>
                  <div className="relative">
                    <div className="flex items-center mb-4 ">
                      <input
                        type="text"
                        placeholder="Search AI Planners"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-14946d focus:border-14946d input-field"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                      <SortDrawer
                        showSortOptions={showSortOptions}
                        setShowSortOptions={setShowSortOptions}
                        setDrawerHeight={setDrawerHeight}
                        drawerHeight={drawerHeight}
                        sortOptions={sortOptions}
                        setSortOptions={setSortOptions}
                        sortOrder={sortOrder}
                        setSortOrder={setSortOrder}
                      />
                    </div>
                  </div>

                  <div
                    className="relative"
                    style={{
                      marginTop: `${drawerHeight + 10}px`,
                      transition: "margin-top 0.3s ease-in-out",
                    }}
                  >
                    <div
                      className="cards-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-16"
                      style={cardContainerStyle}
                    >
                      {loading ? (
                        <div
                          className="center-spinner"
                          style={{ minHeight: "80vh" }}
                        >
                          <Spinner />
                        </div>
                      ) : currentTools.length === 0 ? (
                        <div
                          className="col-span-3 flex justify-center items-center h-64"
                          style={{ minHeight: "80vh" }}
                        >
                          <p>No tools found</p>
                        </div>
                      ) : (
                        currentTools.map((tool) => (
                          <ToolCard
                            key={tool.id}
                            tool={tool}
                            navigate={navigate}
                          />
                        ))
                      )}
                    </div>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      setCurrentPage={setCurrentPage}
                    />
                  </div>
                </>
              }
            />
          </Routes>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}
