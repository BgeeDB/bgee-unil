import React from 'react';
import staticBuilder from '../../helpers/staticBuilder';
import json from '../../static/resources/docs';

const Docs = () => <>{staticBuilder(json)}</>;

export default Docs;
