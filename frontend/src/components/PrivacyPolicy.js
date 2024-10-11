//Privacy Policy Component

import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="flex justify-center min-h-[80vh]">
      <div className="p-8 rounded p-8 rounded w-full max-w-screen-lg">
        <h2 className="text-3xl font-bold mb-4 text-center">Privacy Policy</h2>
        <p>
          We value your privacy. This Privacy Policy outlines how we collect,
          use, and protect your information when you use our platform.
        </p>
        <p className="mt-4">
          When you add a new AI planning software to our platform, you will be
          required to provide your contact email address. This email address is
          collected solely for the purpose of communicating with you regarding
          the software submission and for administrative purposes. We do not
          share, sell, or distribute your email address to any third parties
          under any circumstances.
        </p>
        <p className="mt-4">
          We do not share, sell, or distribute your contact email address to any third
          parties under any circumstances.
        </p>
        <p className="mt-4">
          If you have any questions or concerns regarding this Privacy Policy or
          any of our practices, feel free to contact us at
          <a
            href="mailto:info.aiplanning.software@gmail.com"
            className="underline ml-1"
          >
            info.aiplanning.software@gmail.com
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
