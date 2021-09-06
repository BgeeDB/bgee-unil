import React from 'react';
import staticBuilder from '../../helpers/staticBuilder';
import json from '../../static/resources/docs';

const Docs = () => <div className="container mt-5">{staticBuilder(json)}</div>;

export default Docs;
