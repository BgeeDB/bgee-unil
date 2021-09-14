import React from 'react';
import staticBuilder from '../../helpers/staticBuilder';
import json from '../../static/support/gtex';

const GTEx = () => <>{staticBuilder(json)}</>;

export default GTEx;
