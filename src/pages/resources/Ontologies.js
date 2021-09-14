import React from 'react';
import staticBuilder from '../../helpers/staticBuilder';
import json from '../../static/resources/ontologies';

const Ontologies = () => <>{staticBuilder(json)}</>;

export default Ontologies;
