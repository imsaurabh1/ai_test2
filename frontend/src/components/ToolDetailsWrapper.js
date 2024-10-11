//Wrapper component

import React from 'react';
import ToolDetails from './ToolDetails';

function ToolDetailsWrapper({ tools }) {
  return <ToolDetails tools={tools} />;
}

export default ToolDetailsWrapper;
