import React from 'react';
import Bulma from '../Bulma';
import NewsItem from '../NewsItem';
import News20230424 from '../../markdown/news/News-2023-04-24.md';

const HomeNewsList = () => (
  <>
    <Bulma.Card.Header>
      <Bulma.Card.Header.Title className="is-size-5 has-text-primary">
        News
      </Bulma.Card.Header.Title>
    </Bulma.Card.Header>
    <Bulma.Card.Body style={{ height: 350, overflowY: 'auto' }}>
      <div className="content">
        <NewsItem date="2023-04-24" News={News20230424} />
      </div>
    </Bulma.Card.Body>
  </>
);

export default HomeNewsList;
