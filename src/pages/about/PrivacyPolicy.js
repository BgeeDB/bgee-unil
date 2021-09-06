import React from 'react';
import staticBuilder from '../../helpers/staticBuilder';
import json from '../../static/about/privacyPolicy';

const PrivacyPolicy = () => (
  <div className="container mt-5">{staticBuilder(json)}</div>
);

export default PrivacyPolicy;
