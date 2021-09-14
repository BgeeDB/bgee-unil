import React from 'react';
import staticBuilder from '../../helpers/staticBuilder';
import json from '../../static/about/privacyPolicy';

const PrivacyPolicy = () => <>{staticBuilder(json)}</>;

export default PrivacyPolicy;
