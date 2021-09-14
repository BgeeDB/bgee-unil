import React from 'react';
import staticBuilder from '../../helpers/staticBuilder';
import json from '../../static/download/dataDump';

const DataDumps = () => <>{staticBuilder(json)}</>;

export default DataDumps;
