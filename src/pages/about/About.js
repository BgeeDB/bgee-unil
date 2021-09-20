import React from 'react';
import staticBuilder from '../../helpers/staticBuilder';
import json from '../../static/about/about';

const About = () => <>{staticBuilder(json)}</>;

export default About;
