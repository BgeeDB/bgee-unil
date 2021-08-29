import React from 'react';
import staticBuilder from '../../helpers/staticBuilder';
import json from '../../static/resources/annotations';

const Annotations = () => (
  <div className="container">{staticBuilder(json)}</div>
);

export default Annotations;
