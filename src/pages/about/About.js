import React from 'react';
import staticBuilder from '../../helpers/staticBuilder';
import json from '../../static/about/about';

const About = () => <div className="container">{staticBuilder(json)}</div>;

export default About;
