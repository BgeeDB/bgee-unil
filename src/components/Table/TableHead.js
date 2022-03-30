/* eslint-disable react/no-array-index-key */
import React, { useContext } from 'react';
import { isHideMediaQuery } from '../../helpers/constants/mediaQueries';
import { TableContext } from '../../contexts/TableContext';

const cssSortOption = (key, sortOpts) => {
  let pos;
  let type;
  if (sortOpts) {
    if (Array.isArray(sortOpts)) {
      pos = sortOpts.findIndex((s) => s.key === key);
      if (pos >= 0) {
        type = sortOpts[pos].sort;
        pos += 1;
      }
    } else if (sortOpts.key === key) type = sortOpts.sort;
  }

  if (type === 'descending')
    return (
      <>
        <span className="icon is-small">
          <ion-icon name="caret-down-outline" />
        </span>
        {typeof pos === 'number' && <sup>{pos}</sup>}
      </>
    );
  if (type === 'ascending')
    return (
      <>
        <span className="icon is-small">
          <ion-icon name="caret-up-outline" />
        </span>
        {typeof pos === 'number' && <sup>{pos}</sup>}
      </>
    );

  return null;
};
const TableHead = () => {
  const {
    columns,
    sortable,
    sortOption,
    defineSortOption,
    showTableModalButton,
    usedWidth,
  } = useContext(TableContext);
  return (
    <thead>
      <tr>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        {showTableModalButton && <th />}
        {columns.map((item, key) => {
          if (typeof item === 'object') {
            if (isHideMediaQuery(usedWidth, item.hide)) return null;
            return (
              <th
                key={item.key}
                onClick={
                  sortable && !item.noSort
                    ? defineSortOption(item.key)
                    : undefined
                }
                style={item.style}
              >
                {item.text}
                {cssSortOption(item.key, sortOption)}
              </th>
            );
          }
          return <th key={key}>{item}</th>;
        })}
      </tr>
    </thead>
  );
};

export default TableHead;
