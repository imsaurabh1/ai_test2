//Card Component

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import useStarRating from "../hooks/useStarRating";


const getTooltipContent = (stars) => {
  switch (stars) {
    case 5:
      return "Fully Documented AI Planning Software";
    case 4:
      return "Comprehensive Coverage of AI Planning Software";
    case 3:
      return "Moderate Coverage of AI Planning Software";
    case 2:
      return "Partial Coverage of AI Planning Software";
    case 1:
      return "Insufficient Details of AI Planning Software";
    default:
      return "No Rating Available";
  }
};


const ToolCard = ({ tool, navigate }) => {
  const { stars, color } = useStarRating(tool.excellenceScore);

  
  return (
    <div
      className="bg-white p-4 rounded-lg shadow-md card cursor-pointer"
      onClick={() => navigate(`/tools/${tool.id}`)}
    >
      <h2 className="text-xl font-semibold">{tool.shortName || "N/A"}</h2>

      <p className="mt-2">
        <span className="font-semibold">Languages:</span>{" "}
        {tool.planningLanguage || "N/A"}
      </p>

      <p className="mt-2 line-clamp-3">
        <span className="font-semibold">Explanation Abstract:</span>{" "}
        {tool.explanationAbstract || "N/A"}
      </p>

      <p className="mt-2">
        <span className="font-semibold">Year:</span> {tool.year || "N/A"}
      </p>

      <p className="mt-2">
        <span className="font-semibold">Contributors:</span>{" "}
        {tool.contributors || "N/A"}
      </p>

      <div className="mt-4 flex items-center flex-wrap">
        <p className="font-semibold mr-2">Excellence Score:</p>
        <div className={`flex ${color} text-base sm:text-lg md:text-xl`}>
          {Array.from({ length: 5 }, (_, index) => (
            <FontAwesomeIcon
              key={index}
              icon={faStar}
              className={`inline-block ${
                index < stars ? color : "text-gray-300"
              }`}
              title={getTooltipContent(stars)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolCard;
