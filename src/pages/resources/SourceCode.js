import React from 'react';
import staticBuilder from '../../helpers/staticBuilder';
import json from '../../static/resources/source';

const SourceCode = () => <div className="container">{staticBuilder(json)}</div>;

export default SourceCode;
