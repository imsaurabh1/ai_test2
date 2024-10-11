//Pagination Component

import React from "react";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
    const handleNextPage = () => {
        setCurrentPage((prevPage) => {
          const nextPage = Math.min(prevPage + 1, totalPages);
          if (nextPage !== prevPage) {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
          return nextPage;
        });
      };

      const handlePreviousPage = () => {
        setCurrentPage((prevPage) => {
          const prevPageNumber = Math.max(prevPage - 1, 1);
          if (prevPageNumber !== prevPage) {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
          return prevPageNumber;
        });
      };

  return (
    <div className="relative bottom-0 left-0 right-0 bg-white py-4">
      <div className="flex justify-center">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 mx-1 pagination-button rounded ${
            currentPage === 1 ? "disabled" : ""
          }`}
        >
          Previous
        </button>
        <span className="px-4 py-2 mx-1 bg-gray-100 rounded">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 mx-1 pagination-button rounded ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
