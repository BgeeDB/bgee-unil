import React from 'react';
import staticBuilder from '../../helpers/staticBuilder';
import json from '../../static/resources/rPackage';

const RPackages = () => <div className="container">{staticBuilder(json)}</div>;

export default RPackages;
