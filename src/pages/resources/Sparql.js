import React from 'react';
import staticBuilder from '../../helpers/staticBuilder';
import json from '../../static/resources/sparql';

const Sparql = () => <>{staticBuilder(json)}</>;

export default Sparql;
