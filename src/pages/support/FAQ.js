import React from 'react';
import staticBuilder from '../../helpers/staticBuilder';
import json from '../../static/support/faq';

const FAQ = () => <div className="container">{staticBuilder(json)}</div>;

export default FAQ;
