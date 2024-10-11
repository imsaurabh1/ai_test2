//Header Component

import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header p-4 bg-teal-600 text-white shadow-lg">
      <div className="flex justify-between items-center">
        <Link to="/">
          <h1 className="text-xl font-semibold">AI Planning Software Repository</h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;
