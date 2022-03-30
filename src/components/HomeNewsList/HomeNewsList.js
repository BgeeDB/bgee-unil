import React from 'react';
import Bulma from '../Bulma';
import NewsItem from '../NewsItem';
import News20210615 from '../../markdown/news/News-2021-06-15.md';

const HomeNewsList = () => (
  <>
    <Bulma.Card.Header>
      <Bulma.Card.Header.Title className="is-size-5 has-text-primary">
        News
      </Bulma.Card.Header.Title>
    </Bulma.Card.Header>
    <Bulma.Card.Body style={{ height: 350, overflowY: 'auto' }}>
      <div className="content">
        <NewsItem date="2021-06-15" News={News20210615} />
      </div>
    </Bulma.Card.Body>
  </>
);

export default HomeNewsList;
