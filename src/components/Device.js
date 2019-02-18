import React from 'react';

const Device = ({name, isActive, setActive}) => (
  <li>
    <span>{name}</span>
    {isActive && (
      <span className="color-primary"> Active </span>
    )}
    {!isActive && (
      <button 
        className='btn btn-primary'
        onClick={setActive}
      >
        Set as Active
      </button>
    )}
  </li>
);

export default Device;