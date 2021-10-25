import React from 'react';
import Bulma from '../Bulma';

const NewsItem = ({ date, children }) => (
  <Bulma.Columns>
    <Bulma.C size={2}>
      <p className="has-text-centered has-text-weight-bold">{date}</p>
    </Bulma.C>
    {/* eslint-disable-next-line react/no-danger-with-children */}
    <Bulma.C size={10}>{children}</Bulma.C>
  </Bulma.Columns>
);

export default NewsItem;
