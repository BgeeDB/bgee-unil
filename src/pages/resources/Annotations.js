import React from 'react';
import staticBuilder from '../../helpers/staticBuilder';
import json from '../../static/resources/annotations';

const Annotations = () => (
  <div className="container mt-5">{staticBuilder(json)}</div>
);

export default Annotations;
