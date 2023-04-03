import React from 'react';
import Bulma from '../../components/Bulma';
import GoTop from '../../components/GoTop';
import News20230331 from '../../markdown/news/News-2023-03-31.md';
import News20220329 from '../../markdown/news/News-2022-03-29.md';
import News20200820 from '../../markdown/news/News-2020-08-20.md';
import News20210222 from '../../markdown/news/News-2021-02-22.md';
import News20200326 from '../../markdown/news/News-2020-03-26.md';
import News20191005 from '../../markdown/news/News-2019-10-05.md';
import News20190521 from '../../markdown/news/News-2019-05-21.md';
import News20190512 from '../../markdown/news/News-2019-05-12.md';
import News20190405 from '../../markdown/news/News-2019-04-05.md';
import News20180214 from '../../markdown/news/News-2018-02-14.md';
import News20170516 from '../../markdown/news/News-2017-05-16.md';
import News20160706 from '../../markdown/news/News-2016-07-06.md';
import News20160509 from '../../markdown/news/News-2016-05-09.md';
import News20160322 from '../../markdown/news/News-2016-03-22.md';
import News20160309 from '../../markdown/news/News-2016-03-09.md';
import News20151214 from '../../markdown/news/News-2015-12-24.md';
import News20151124 from '../../markdown/news/News-2015-11-24.md';
import News20150826 from '../../markdown/news/News-2015-08-26.md';
import News20150608 from '../../markdown/news/News-2015-06-08.md';
import News20150416 from '../../markdown/news/News-2015-04-16.md';
import News20150303 from '../../markdown/news/News-2015-03-03.md';
import News20141219 from '../../markdown/news/News-2014-12-19.md';

import NewsItem from '../../components/NewsItem';

const NewsPage = () => (
  <>
    <div className="content has-text-centered">
      <Bulma.Title size={5}>News</Bulma.Title>
    </div>
    <div className="content">
      <NewsItem date="2023-03-31" News={News20230331} />
      <div className="separator" />
      <NewsItem date="2022-03-31" News={News20220329} />
      <div className="separator" />
      <NewsItem date="2021-02-22" News={News20210222} />
      <div className="separator" />
      <NewsItem date="2020-08-20" News={News20200820} />
      <div className="separator" />
      <NewsItem date="2020-03-26" News={News20200326} />
      <div className="separator" />
      <NewsItem date="2019-10-05" News={News20191005} />
      <div className="separator" />
      <NewsItem date="2019-05-21" News={News20190521} />
      <div className="separator" />
      <NewsItem date="2019-05-12" News={News20190512} />
      <div className="separator" />
      <NewsItem date="2019-04-05" News={News20190405} />
      <div className="separator" />
      <NewsItem date="2018-02-14" News={News20180214} />
      <div className="separator" />
      <NewsItem date="2017-05-16" News={News20170516} />
      <div className="separator" />
      <NewsItem date="2016-07-06" News={News20160706} />
      <div className="separator" />
      <NewsItem date="2016-05-09" News={News20160509} />
      <div className="separator" />
      <NewsItem date="2016-03-22" News={News20160322} />
      <div className="separator" />
      <NewsItem date="2016-03-09" News={News20160309} />
      <div className="separator" />
      <NewsItem date="2015-12-24" News={News20151214} />
      <div className="separator" />
      <NewsItem date="2015-11-24" News={News20151124} />
      <div className="separator" />
      <NewsItem date="2015-08-26" News={News20150826} />
      <div className="separator" />
      <NewsItem date="2015-06-08" News={News20150608} />
      <div className="separator" />
      <NewsItem date="2015-04-16" News={News20150416} />
      <div className="separator" />
      <NewsItem date="2015-03-03" News={News20150303} />
      <div className="separator" />
      <NewsItem date="2014-12-19" News={News20141219} />
    </div>
    <GoTop />
  </>
);

export default NewsPage;
