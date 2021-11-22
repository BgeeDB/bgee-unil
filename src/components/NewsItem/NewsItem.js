/* eslint-disable react/no-children-prop,no-param-reassign,react/no-danger-with-children */
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { visit } from 'unist-util-visit';
import { useHistory } from 'react-router-dom';
import rehypeHighlight from 'rehype-highlight';
import rehypeSanitize from 'rehype-sanitize';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import Bulma from '../Bulma';

const NewsItem = ({ date, News }) => {
  const history = useHistory();
  const rehypeLink = React.useCallback(
    () => (tree) => {
      visit(tree, 'element', (node) => {
        const isInternal = /(^#)|(^\/)|(^https:\/\/bgee.org)/gi;
        if (node.tagName === 'a') {
          if (isInternal.test(node.properties.href)) {
            node.properties.classname = 'internal-link';
            node.properties.onclick = (e) => {
              e.preventDefault();
              history.push(e.target.href.replace(window.location.origin, ''));
            };
          } else {
            node.properties.classname = 'external-link';
            node.properties.target = '_blank';
            node.properties.rel = 'noopener noreferrer';
          }
        }
      });
    },
    [history]
  );

  return (
    <Bulma.Columns>
      <Bulma.C size={2}>
        <p className="has-text-centered has-text-weight-bold">{date}</p>
      </Bulma.C>
      <Bulma.C size={10}>
        <ReactMarkdown
          children={News}
          rehypePlugins={[
            rehypeHighlight,
            rehypeSanitize,
            rehypeRaw,
            rehypeSlug,
            rehypeLink,
          ]}
        />
      </Bulma.C>
    </Bulma.Columns>
  );
};

export default NewsItem;
