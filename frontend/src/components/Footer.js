//Footer component

import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer p-4 bg-green-600 text-white">
      <div className="container mx-auto text-center">
        <p className="inline-block mr-4">&copy; 2024 AI Planning Software Portal</p>
        <nav className="inline-block">
          <Link to="/about-us" className="text-white mx-2 hover:underline">About Us</Link>
          <Link to="/privacy-policy" className="text-white mx-2 hover:underline">Privacy Policy</Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
