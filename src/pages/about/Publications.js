import React from 'react';
import staticBuilder from '../../helpers/staticBuilder';
import json from '../../static/about/publications';

const Publications = () => <>{staticBuilder(json)}</>;

export default Publications;
