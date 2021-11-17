/* eslint-disable react/no-children-prop,no-param-reassign,react/destructuring-assignment */
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkToc from 'remark-toc';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSanitize from 'rehype-sanitize';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import { visit } from 'unist-util-visit';
import { useHistory } from 'react-router-dom';
import ROUTES from '../routes/routes';
import classnames from '../helpers/classnames';
import Bulma from '../components/Bulma';
import LinkExternal from '../components/LinkExternal';

const MarkdownReader = ({ location: { pathname } }) => {
  const history = useHistory();
  const components = React.useMemo(
    () => ({
      h1: ({ children }) => (
        <div className={classnames('content has-text-centered')}>
          <p className="title is-5">{children}</p>
        </div>
      ),
      h2: ({ children }) => (
        <Bulma.Title size={5} className="gradient-underline">
          {children}
        </Bulma.Title>
      ),
      p: ({ children }) => <p className="mb-1">{children}</p>,
      // Rewrite `em`s (`*like so*`) to `i` with a red foreground color.
      // em: ({ node, ...props }) => <i style={{ color: 'red' }} {...props} />,
    }),
    []
  );

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
        // if (node.properties && !hasProperty(node, 'id')) {
        //   node.properties.id = slugs.slug(toString(node));
        // }
      });
    },
    [history]
  );

  return (
    <>
      <LinkExternal to="e" />
      <ReactMarkdown
        className="markdown"
        components={components}
        children={ROUTES[pathname].source}
        remarkPlugins={[remarkGfm, remarkToc]}
        rehypePlugins={[
          rehypeHighlight,
          rehypeSanitize,
          rehypeRaw,
          rehypeSlug,
          rehypeLink,
        ]}
      />
    </>
  );
};

export default MarkdownReader;
