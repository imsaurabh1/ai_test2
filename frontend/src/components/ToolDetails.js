//Software Details Component

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "@mui/material";
import { parseISO } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
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

const ToolDetails = ({ tools }) => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 

  const [loading, setLoading] = useState(true);
  const [tool, setTool] = useState(undefined);

  // Spinner Component
  const Spinner = () => (
    <div
      className="flex justify-center items-center h-full"
      style={{ minHeight: "80vh" }}
    >
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-800"></div>
    </div>
  );

  useEffect(() => {
    // Scroll to the top 
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {

    const fetchData = () => {
      const foundTool = tools.find((tool) => tool.id === id);
      setTimeout(() => {
        setTool(foundTool);
        setLoading(false); // Hide spinner 
      }, 200); 
    };

    fetchData();
  }, [id, tools]);

  // Ensure minimum height for the container
  return (
    <div className="p-6" style={{ minHeight: "80vh" }}>
      {loading ? (
        <Spinner />
      ) : tool ? (
        <>
          <div className="flex items-center mb-4">
            <IconButton
              onClick={() => navigate(-1)}
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
            <h2 className="text-2xl font-bold">AI Planning Software Details</h2>
          </div>

          <h2 className="text-2xl font-bold mb-4">{tool.longName || tool.shortName || "N/A"}</h2>
          <table className="min-w-full border-collapse border border-gray-300">
            <tbody>
              {[
                { label: "Short Name", value: tool.shortName || "N/A" },
                { label: "Long Name", value: tool.longName || "N/A" },
                {
                  label: "Contributors",
                  value: tool.contributors || "N/A",
                },
                { label: "Year", value: tool.year || "N/A" },
                { label: "Last Commit", value: tool.lastCommit || "N/A" },
                {
                  label: "Explanation Abstract",
                  value: tool.explanationAbstract || "N/A",
                },
                {
                  label: "Planning Software References",
                  value: tool.plannerReferences ?(
                    <div >
                      {tool.plannerReferences
                        ?.split(";")
                        .map((reference, index) => {
                          const trimmedReference = reference.trim();
                          if (!trimmedReference) return null;
                          const isLink = trimmedReference.startsWith("http");
                          return (
                            <div key={index}>
                              [{index + 1}]
                              {isLink ? (
                                <a
                                  href={trimmedReference}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-500 underline"
                                >
                                  {" "}
                                  {trimmedReference}
                                </a>
                              ) : (
                                " " + trimmedReference
                              )}
                            </div>
                          );
                        })}
                    </div>
                  ) : (
                    "N/A"
                  ),
                },
                {
                  label: "Documentation",
                  value: tool.documentation ? (
                    <a
                      href={tool.documentation}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      {tool.documentation}
                    </a>
                  ) : (
                    "N/A"
                  ),
                },
                {
                  label: "Executable",
                  value:tool.executable ? (
                    <a
                      href={tool.executable}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      {tool.executable}
                    </a>
                   ) : (
                    "N/A"
                  ),
                },
                {
                  label: "Source Code",
                  value: tool.sourceCode ? (
                    <a
                      href={tool.sourceCode}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      {tool.sourceCode || "N/A"}
                    </a>
                  ): (
                    "N/A"
                  ),
                },
                {
                  label: "Implementation Language",
                  value: tool.implementationLanguage,
                },
                {
                  label: "Operating System",
                  value: tool.operatingSystem?.split(",").join(", ") || "N/A",
                },
                {
                  label: "Environment Notes",
                  value: tool.environmentNotes || "N/A",
                },
                {
                  label: "Planning Language",
                  value: tool.planningLanguage || "N/A",
                },
                {
                  label: "Planning Classes",
                  value: tool.planningClasses
                    ? tool.planningClasses?.split(",").join(", ")
                    : "N/A",
                },
                {
                  label: "Planning Type",
                  value: tool.planningType
                    ? tool.planningType?.split(",").join(", ")
                    : "N/A",
                },
                {
                  label: "Inserted At",
                  value: tool.insertedAt
                    ? formatInTimeZone(
                        parseISO(tool.insertedAt),
                        "Europe/Berlin",
                        "do MMMM yyyy 'at' HH:mm:ss 'CET'"
                      )
                    : "N/A",
                },
              ].map((item, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td style={{ width: "30%" }} className="p-2 font-semibold bg-gray-100">
                    {item.label}:
                  </td>
                  <td style={{ width: "70%" }} className="p-2">{item.value || "N/A"}</td>
                </tr>
              ))}

              {tool.excellenceScore !== undefined && (
                <tr className="border-b border-gray-300">
                  <td className="p-2 font-semibold bg-gray-100">
                    Excellence Score:
                  </td>
                  <td className="p-2">
                    <StarRating excellenceScore={tool.excellenceScore} />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      ) : (
        !loading &&
        tool === null && (
          <div className="text-red-500" style={{ minHeight: "80vh" }}>
            Tool not found!
          </div>
        )
      )}
    </div>
  );
};



const StarRating = ({ excellenceScore }) => {
  const { stars, color } = useStarRating(excellenceScore);

  return (
    <div className={`flex ${color} text-xl`}>
      {Array.from({ length: 5 }, (_, index) => (
        <FontAwesomeIcon
          key={index}
          icon={faStar}
          className={`inline-block ${index < stars ? color : "text-gray-300"}`}
          title={getTooltipContent(stars)}
        />
      ))}
    </div>
  );
};


export default ToolDetails;
