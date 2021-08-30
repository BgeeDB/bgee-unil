import React from 'react';
import staticBuilder from '../../helpers/staticBuilder';
import json from '../../static/support/topAnat';

const TopAnat = () => <div className="container">{staticBuilder(json)}</div>;

export default TopAnat;
