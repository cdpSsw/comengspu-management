import React from 'react';

const Collapse = ({ collapseID, collapseContent }) => {
  return (
    <div 
        className="collapse-container"
    >
      <div 
        className="collapse" 
        id={collapseID}
    >
        <div 
            className="card card-body bg-transparent">
          {collapseContent}
        </div>
      </div>
    </div>
  );
};

export default Collapse;
