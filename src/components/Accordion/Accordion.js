/* eslint-disable react/no-string-refs */
import React from 'react';
import bulmaCollapsible from '@creativebulma/bulma-collapsible/src/js';
import uuid from '../../helpers/uuid';

class Accordion extends React.Component {
  constructor(props) {
    super(props);
    this.id = `accordion-${uuid()}`;
  }

  componentDidMount() {
    // eslint-disable-next-line no-undef
    this.collapsibles = bulmaCollapsible.attach('.is-collapsible', {
      container: this.refs.collapsibles,
    });
  }

  render() {
    const { elements } = this.props;
    return (
      <div
        ref="collapsibles"
        id={this.id}
        className="custom-accordion"
        key={this.id}
      >
        {elements.map(({ title, body }, key) => (
          // eslint-disable-next-line react/no-array-index-key
          <article className="message" key={`${this.id}-${key}`}>
            <a
              className="message-header"
              href={`#collapsible-message-accordion-${key}`}
              data-action="collapse"
            >
              {title}
            </a>
            <div
              id={`collapsible-message-accordion-${key}`}
              className="message-body is-collapsible"
              data-parent={this.id}
            >
              <div className="message-body-content">{body}</div>
            </div>
          </article>
        ))}
      </div>
    );
  }
}

export default Accordion;
