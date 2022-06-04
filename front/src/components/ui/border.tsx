import React from 'react';

const BorderDashed = ({ children }: any) => {
  return <div className="border-b border-dashed border-gray-300">
      {children}
  </div>;
};

export default BorderDashed;
