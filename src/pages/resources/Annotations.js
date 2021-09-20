import React from 'react';
import staticBuilder from '../../helpers/staticBuilder';
import json from '../../static/resources/annotations';

const Annotations = () => <>{staticBuilder(json)}</>;

export default Annotations;
