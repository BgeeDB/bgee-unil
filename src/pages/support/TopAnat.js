import React from 'react';
import staticBuilder from '../../helpers/staticBuilder';
import json from '../../static/support/topAnat';

const TopAnat = () => <>{staticBuilder(json)}</>;

export default TopAnat;
