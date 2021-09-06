import React from 'react';
import staticBuilder from '../../helpers/staticBuilder';
import json from '../../static/support/topAnat';

const TopAnat = () => (
  <div className="container mt-5">{staticBuilder(json)}</div>
);

export default TopAnat;
