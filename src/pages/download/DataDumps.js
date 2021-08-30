import React from 'react';
import staticBuilder from '../../helpers/staticBuilder';
import json from '../../static/download/dataDump';

const DataDumps = () => <div className="container">{staticBuilder(json)}</div>;

export default DataDumps;
