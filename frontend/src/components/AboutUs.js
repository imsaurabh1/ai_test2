//About Us page 
import React from "react";

const AboutUs = () => {
  return (
    <div className="flex justify-center  min-h-[80vh]">
      <div className="text-green p-8 rounded w-full max-w-screen-lg">
        <h2 className="text-3xl font-bold mb-4 text-center">About Us</h2>
        <p>
        Welcome to the AI Planning Software Portal, a unified platform designed to centralize and share resources related to AI planning. Our platform brings together AI planning software, making it easier for users to discover, access, and use these AI planning software as per their requirements.
        </p>
        <p className="mt-4">
          The AI Planning Software Portal supports the collection, organization, and sharing of metadata about AI planning software, ensuring that users can easily find tools that suit their needs.
        </p>
        <p className="mt-4">
        Our platform also serves as a collaborative space for developers, researchers, and AI enthusiasts to contribute and expand the available resources.
        </p>
        <p className="mt-4">
          For any inquiries, feel free to reach out to us at
          <a href="mailto:info.aiplanning.software@gmail.com" className="underline ml-1">
          info.aiplanning.software@gmail.com
          </a>.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
