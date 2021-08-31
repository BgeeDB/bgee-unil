import React from 'react';
import staticBuilder from '../../helpers/staticBuilder';
import json from '../../static/support/gtex';

const GTEx = () => <div className="container">{staticBuilder(json)}</div>;

export default GTEx;
