/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-cycle */
import React from 'react';
import staticBuilder from '../../helpers/staticBuilder';
import classnames from '../../helpers/classnames';

const defaultRender = (cell, key) => {
  if (typeof cell === 'string' || typeof cell === 'number')
    return <p key={key}>{cell}</p>;
  return Array.isArray(cell) ? (
    <div key={key}>{staticBuilder(cell)}</div>
  ) : null;
};

const Table = ({
  scrollable = false,
  fullwidth = true,
  classNames = '',
  title,
  columns = [],
  data = [],
  sortable = false,
  onSort,
  onRenderCell,
  striped,
}) => {
  const [sortOption, setSortOption] = React.useState();
  const defineSortOption = React.useCallback(
    (key) => () => {
      let newSortOpt;
      if (!sortOption || sortOption.key !== key) {
        newSortOpt = { key, sort: 'ascending' };
      } else if (sortOption.sort === 'ascending')
        newSortOpt = { key, sort: 'descending' };
      setSortOption(newSortOpt);
      if (onSort) onSort(newSortOpt);
    },
    [sortOption, onSort]
  );

  const [isExpanded, setIsExpanded] = React.useState();
  const expandAction = React.useCallback(
    (key) => () => setIsExpanded(isExpanded === key ? undefined : key),
    [isExpanded]
  );
  let TableObject = (
    <table
      className={classnames(
        'table',
        { sortable, 'is-fullwidth': fullwidth, 'is-striped': striped },
        classNames
      )}
    >
      <thead>
        <tr>
          {columns.map((item, key) => {
            if (typeof item === 'object')
              return (
                <th key={item.key} onClick={defineSortOption(item.key)}>
                  {item.abbr && <abbr title={item.abbr} />}
                  {item.text}
                  {sortOption &&
                    sortOption.key === item.key &&
                    sortOption.sort === 'descending' && (
                      <span className="icon is-small">
                        <ion-icon name="caret-down-outline" />
                      </span>
                    )}
                  {sortOption &&
                    sortOption.key === item.key &&
                    sortOption.sort === 'ascending' && (
                      <span className="icon is-small">
                        <ion-icon name="caret-up-outline" />
                      </span>
                    )}
                </th>
              );
            return <th key={key}>{item}</th>;
          })}
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
          <tr
            key={key}
            className={`${isExpanded === key ? 'is-expanded' : ''}`}
          >
            {Array.isArray(row) &&
              row.map((cell, cellKey) => (
                <td key={`${key}-${cellKey}`}>
                  {onRenderCell
                    ? onRenderCell(
                        { cell, key: cellKey, keyRow: key },
                        defaultRender,
                        {
                          expandAction: expandAction(key),
                          isExpanded: isExpanded === key,
                        }
                      )
                    : defaultRender(cell, cellKey)}
                </td>
              ))}
            {typeof row &&
              !Array.isArray(row) &&
              columns.map((c, keyCol) => (
                <td key={`${key}-col-${keyCol}`}>
                  {onRenderCell
                    ? onRenderCell(
                        { cell: row, key: c.key || keyCol, keyRow: key },
                        defaultRender,
                        {
                          expandAction: expandAction(key),
                          isExpanded: isExpanded === key,
                        }
                      )
                    : null}
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
