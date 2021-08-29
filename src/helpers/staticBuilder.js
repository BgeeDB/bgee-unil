import React from 'react';
import { Link } from 'react-router-dom';

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
        return <code>{props.content}</code>;
      case 'italic':
        return <i>{props.content}</i>;
      case 'text':
        return props.content;
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
      case 'rich_text':
        return richTextBuilder(props.content);
      default:
        return null;
    }
  });

const staticBuilder = (json) =>
  json.map(({ type, ...props }) => {
    switch (type) {
      case 'break_line':
        return (
          <>
            <br />
          </>
        );
      case 'bold':
        return <b>{props.content}</b>;
      case 'text':
        return <p>{props.content}</p>;
      case 'rich_text':
        return <p>{richTextBuilder(props.content)}</p>;
      case 'title':
        return (
          <div className="content has-text-centered">
            <p className="title is-5">{props.content}</p>
          </div>
        );
      case 'link_image':
        return (
          <a href={props.path} target="_blank" rel="noopener noreferrer">
            <img src={props.src} alt={props.alt} style={props.style} />
          </a>
        );
      case 'unordered_list':
        return (
          <ul className="unordered">
            {props.children.map((element) => (
              <li>{staticBuilder([element])}</li>
            ))}
          </ul>
        );
      case 'ordered_list':
        return (
          <ol className="ordered">
            {props.children.map((element) => (
              <li>{staticBuilder([element])}</li>
            ))}
          </ol>
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
      default:
        return null;
    }
  });

export default staticBuilder;
