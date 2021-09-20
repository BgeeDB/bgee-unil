import React from 'react';
import staticBuilder from '../../helpers/staticBuilder';
import json from '../../static/resources/source';

const SourceCode = () => <>{staticBuilder(json)}</>;

export default SourceCode;
