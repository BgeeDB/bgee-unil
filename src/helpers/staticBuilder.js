/* eslint-disable no-use-before-define */
import React from 'react';
import { Link } from 'react-router-dom';
import arrayHelper from './array';

const richTextBuilder = (elements) =>
  elements.map(({ type, ...props }) => {
    switch (type) {
      case 'break_line':
        return (
          <>
            <br />
          </>
        );
      case 'bold':
        return <b>{props.content}</b>;
      case 'code':
        return <code className={props.classNames}>{props.content}</code>;
      case 'italic':
        return <i>{props.content}</i>;
      case 'link_internal':
        return (
          <Link to={props.path} className="internal-link">
            {props.text}
          </Link>
        );
      case 'link_external':
        return (
          <a
            href={props.path}
            target="_blank"
            rel="noopener noreferrer"
            className="external-link"
          >
            {props.text}
          </a>
        );
      case 'link_mail':
        return (
          <a className="mail-link" href={`mailto:${props.email}`}>
            {props.text}
          </a>
        );
      case 'link_phone_number':
        return <a href={`tel:${props.phoneNumber}`}>{props.text}</a>;
      case 'pre_code':
        return (
          <pre>
            <code className={props.classNames}>{props.content}</code>
          </pre>
        );
      case 'rich_text':
        return richTextBuilder(props.content);
      case 'text':
        return props.content;
      default:
        return null;
    }
  });

const gridBuilder = ({ cols, content, fillRow }) => (
  <>
    {arrayHelper
      .chunked(content, cols, {
        fillChunk: fillRow,
        defaultItemFactory: () => ({ children: [] }),
      })
      .map((tiles) => (
        <div className="tile is-ancestor">
          {tiles.map(({ classNames, children }) => (
            <div className="tile is-parent">
              <article className={`tile is-child ${classNames || ''}`}>
                {staticBuilder(children)}
              </article>
            </div>
          ))}
        </div>
      ))}
  </>
);

const staticBuilder = (json) =>
  json.map(({ type, ...props }) => {
    let Component = null;
    switch (type) {
      case 'break_line':
        return (
          <>
            <br />
          </>
        );
      case 'bold':
        return (
          <p>
            <b>{props.content}</b>
          </p>
        );
      case 'card':
        Component = () => (
          <div className={`card custom-card ${props.classNames || ''}`}>
            {props.image && (
              <div className="card-image">
                <figure
                  className={`image ${
                    props.imageClass ? props.imageClass : 'is-128x128'
                  }`}
                >
                  <img {...props.image} />
                </figure>
              </div>
            )}

            <div className="card-content">
              <p className="card-title">{props.title}</p>
              {props.description && (
                <p className="card-description">{props.description}</p>
              )}
              {props.richDescription && (
                <p className="card-description">
                  {richTextBuilder(props.richDescription)}
                </p>
              )}
            </div>
          </div>
        );
        if (props.linkType === 'internal')
          return (
            <Link to={props.link}>
              <Component />
            </Link>
          );
        if (props.linkType === 'external')
          return (
            <a href={props.link} target="_blank" rel="noopener noreferrer">
              <Component />
            </a>
          );
        return <Component />;
      case 'grid':
        return gridBuilder(props);
      case 'link_external':
        return (
          <a
            href={props.path}
            target="_blank"
            rel="noopener noreferrer"
            className="external-link"
          >
            {props.text}
          </a>
        );
      case 'link_image':
        return (
          <a href={props.path} target="_blank" rel="noopener noreferrer">
            <img src={props.src} alt={props.alt} style={props.style} />
          </a>
        );
      case 'link_internal':
        return (
          <Link to={props.path} className="internal-link">
            {props.text}
          </Link>
        );
      case 'ordered_list':
        return (
          <ol className="ordered">
            {props.children.map((element) => (
              <li>{staticBuilder([element])}</li>
            ))}
          </ol>
        );
      case 'pre_code':
        return (
          <pre>
            <code className={props.classNames}>{props.content}</code>
          </pre>
        );
      case 'rich_text':
        return (
          <p className={props.classNames}>{richTextBuilder(props.content)}</p>
        );
      case 'section':
        return (
          <>
            <p className="title is-6 gradient-underline">{props.title}</p>
            <div className="static-section">
              {staticBuilder(props.children)}
            </div>
          </>
        );
      case 'text':
        return <p className={props.classNames}>{props.content}</p>;
      case 'title':
        return (
          <div className="content has-text-centered">
            <p className="title is-5">{props.content}</p>
          </div>
        );
      case 'unordered_list':
        return (
          <ul className="unordered">
            {props.children.map((element) => (
              <li>{staticBuilder([element])}</li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  });

export default staticBuilder;
