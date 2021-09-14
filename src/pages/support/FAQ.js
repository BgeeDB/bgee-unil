import React from 'react';
import staticBuilder from '../../helpers/staticBuilder';
import json from '../../static/support/faq';

const FAQ = () => <>{staticBuilder(json)}</>;

export default FAQ;
