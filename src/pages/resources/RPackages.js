import React from 'react';
import staticBuilder from '../../helpers/staticBuilder';
import json from '../../static/resources/rPackage';

const RPackages = () => <>{staticBuilder(json)}</>;

export default RPackages;
