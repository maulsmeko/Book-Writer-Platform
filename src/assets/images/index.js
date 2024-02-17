import React from 'react';

// Importing image files
import editingIcon from './editing.png';
import viewIcon from './view.png';

// Defining functional components for icons
const EditIcon = () => {
  return <img src={editingIcon} alt="Edit Icon" />;
};

const ViewIcon = () => {
  return <img src={viewIcon} alt="View Icon" />;
};

// Exporting the components
export { EditIcon, ViewIcon };