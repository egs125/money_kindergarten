import React from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const FloatingAddBtn = ({ movePage }) => {
  return (
    <div className="floating-btn" onClick={movePage}>
      <AddCircleIcon color="primary" style={{ fontSize: 50 }} />
    </div>
  );
};

export default FloatingAddBtn;
