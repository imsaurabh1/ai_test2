//sorting Component

import React from "react";
import SwapVertIcon from "@mui/icons-material/SwapVert";

const SortDrawer = ({
  showSortOptions,
  setShowSortOptions,
  setDrawerHeight,
  drawerHeight,
  sortOptions,
  setSortOptions,
  sortOrder,
  setSortOrder,
}) => {

  const toggleSortDrawer = () => {
    if (!showSortOptions) {
      setDrawerHeight(65); //show drawer
    } else {
      setDrawerHeight(0); // Hide drawer
    }
    setShowSortOptions(!showSortOptions);
  };

  // Function to handle one sorting
  const handleSortOptionClick = (option) => {
    if (sortOptions === option) {
      setSortOptions(null); 
      setSortOrder(null); 
    } else {
      setSortOptions(option); 
      setSortOrder("desc"); 
    }
  };

  //toggle sorting order between ascending and descending
  const toggleSortOrder = () => {
    if (sortOptions) {
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    }
  };

  return (
    <>
      <button
        onClick={toggleSortDrawer}
        className="px-3 py-2 ml-4 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-green-500 focus:border-green-500 mt-2"
      >
        <SwapVertIcon />
      </button>

      {showSortOptions && (
        <div
          className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-300 shadow-md sorting-drawer"
          style={{
            transition: "height 0.3s ease-in-out",
            overflow: "hidden",
            height: `${drawerHeight}px`,
          }}
        >
          <div className="flex space-x-2 text-sm">
            {/* Option to Sort by Year */}
            <div
              onClick={() => handleSortOptionClick("year")}
              className={`sorting-option text-center ${
                sortOptions === "year" ? "selected" : "unselected"
              }`}
            >
              Sort By Published Year
            </div>

            {/* Option to Sort by Excellence Score */}
            <div
              onClick={() => handleSortOptionClick("excellenceScore")}
              className={`sorting-option text-center ${
                sortOptions === "excellenceScore" ? "selected" : "unselected"
              }`}
            >
              Sort by Excellence Score
            </div>
            {/* Option to Sort by Date Added */}            
            <div
              onClick={() => handleSortOptionClick("insertedAt")}
              className={`sorting-option text-center ${
                sortOptions === "insertedAt" ? "selected" : "unselected"
              }`}
            >
              Sort by Date Added
            </div>

            {/* Toggle Sorting Order */}
            <div
              onClick={toggleSortOrder}
              className={`sorting-option  text-center ${
                sortOptions ? "selected" : "unselected cursor-not-allowed"
              }`}
            >
              {sortOrder === "asc" ? "Ascending" : "Descending"}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SortDrawer;
