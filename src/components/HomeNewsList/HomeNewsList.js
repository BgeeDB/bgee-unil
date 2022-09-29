import React from 'react';
import Bulma from '../Bulma';
import NewsItem from '../NewsItem';
import News20220329 from '../../markdown/news/News-2022-03-29.md';

const HomeNewsList = () => (
  <>
    <Bulma.Card.Header>
      <Bulma.Card.Header.Title className="is-size-5 has-text-primary">
        News
      </Bulma.Card.Header.Title>
    </Bulma.Card.Header>
    <Bulma.Card.Body style={{ height: 350, overflowY: 'auto' }}>
      <div className="content">
        <NewsItem date="2022-03-31" News={News20220329} />
      </div>
    </Bulma.Card.Body>
  </>
);

export default HomeNewsList;
