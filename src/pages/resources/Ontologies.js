import React from 'react';
import staticBuilder from '../../helpers/staticBuilder';
import json from '../../static/resources/ontologies';

const Ontologies = () => (
  <div className="container mt-5">{staticBuilder(json)}</div>
);

export default Ontologies;
