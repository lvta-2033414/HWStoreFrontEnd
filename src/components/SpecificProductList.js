import React from 'react';
// import { useParams } from 'react-router-dom';

export const SpecificProductList = (props) => {
  return props.obj1.property1 || props.obj2.property1 ? (
    <h1>abc</h1>
  ) : (
    <h1>xyz</h1>
  );
};
