/* eslint-disable react/no-array-index-key */
import React from 'react';
// eslint-disable-next-line import/no-cycle
import staticBuilder from '../../helpers/staticBuilder';

const Table = ({
  scrollable = false,
  fullwidth = true,
  classNames = '',
  title,
  columns = [],
  data = [],
}) => {
  let TableObject = (
    <table className={`table ${classNames} ${fullwidth ? 'is-fullwidth' : ''}`}>
      <thead>
        <tr>
          {columns.map((item, key) => (
            <th key={key}>{item}</th>
          ))}
        </tr>
      </thead>
      <tfoot>
        <tr>
          {columns.map((item, key) => (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <th key={key}> </th>
          ))}
        </tr>
      </tfoot>
      <tbody>
        {data.map((row, key) => (
          <tr key={key}>
            {row.map((cell, cellKey) => (
              <td key={`${key}-${cellKey}`}>
                {typeof cell === 'string' || typeof cell === 'number'
                  ? cell
                  : null}
                {Array.isArray(cell) ? staticBuilder(cell) : null}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  if (scrollable)
    TableObject = <div className="table-container">{TableObject}</div>;

  return (
    <div>
      {title && (
        <p className="has-text-centered has-text-weight-semibold mb-1">
          {title}
        </p>
      )}
      {TableObject}
    </div>
  );
};

export default Table;
