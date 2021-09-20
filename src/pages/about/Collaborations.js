import React from 'react';
import staticBuilder from '../../helpers/staticBuilder';
import json from '../../static/about/collaborations';

const Collaborations = () => <>{staticBuilder(json)}</>;

export default Collaborations;
