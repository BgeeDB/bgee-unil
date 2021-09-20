import React from 'react';
import staticBuilder from '../../helpers/staticBuilder';
import json from '../../static/about/sources';

const Sources = () => <>{staticBuilder(json)}</>;

export default Sources;
