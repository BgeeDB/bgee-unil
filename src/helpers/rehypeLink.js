/* eslint-disable no-param-reassign */
import { visit } from 'unist-util-visit';

const rehypeLink = (history) => () => (tree) => {
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
};

export default rehypeLink;
