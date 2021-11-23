/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-cycle */
import React from 'react';
import staticBuilder from '../../helpers/staticBuilder';
import classnames from '../../helpers/classnames';
import {
  hasColumnsTableHidden,
  isHideMediaQuery,
} from '../../helpers/constants/mediaQueries';
import useWindowSize from '../../hooks/useWindowSize';
import { ModalContext } from '../../contexts/ModalContext';
import Bulma from '../Bulma';

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
const Table = ({
  fullwidth = true,
  classNames = '',
  title,
  columns = [],
  data = [],
  sortable = false,
  onSort,
  onRenderCell,
  onRenderRow, // function that generate custom css classes depending of
  striped,
  multiSortable,
}) => {
  const table = React.useRef();
  const { width } = useWindowSize();
  const { showModal, hideModal } = React.useContext(ModalContext);
  const [sortOption, setSortOption] = React.useState();
  const defineSortOption = React.useCallback(
    (key) => (event) => {
      if (onSort) {
        if (multiSortable && event.shiftKey) {
          let newSort;
          if (!Array.isArray(sortOption))
            newSort = [{ key, sort: 'ascending' }];
          else {
            newSort = [...sortOption];
            const pos = newSort.findIndex((f) => f.key === key);
            if (pos >= 0) {
              if (newSort[pos].sort === 'ascending')
                newSort[pos].sort = 'descending';
              else newSort.splice(pos, 1);
            } else {
              newSort.push({ key, sort: 'ascending' });
            }
          }
          setSortOption(newSort);
          onSort(newSort);
        } else {
          let newSortOpt;
          if (!sortOption || sortOption.key !== key) {
            newSortOpt = { key, sort: 'ascending' };
          } else if (sortOption.sort === 'ascending') {
            newSortOpt = { key, sort: 'descending' };
          }
          setSortOption(newSortOpt);
          onSort(newSortOpt);
        }
      }
    },
    [multiSortable, sortOption, onSort]
  );

  const defaultRender = React.useCallback(
    (cell, key) => {
      let style;
      const col = columns.find((c) => c?.key === key);
      if (col && col.style) {
        style = columns.find((c) => c?.key === key).style;
      }
      if (typeof cell === 'string' || typeof cell === 'number')
        return (
          <span key={key} style={style}>
            {cell}
          </span>
        );

      return Array.isArray(cell) ? (
        <div key={key} style={style}>
          {staticBuilder(cell)}
        </div>
      ) : null;
    },
    [columns, table]
  );
  const showModalDetails = React.useCallback(
    (item) => () => {
      console.log(columns, item);
      let titleModal = 'Details';
      if (item?.condition?.anatEntity)
        titleModal += ` in ${item?.condition?.anatEntity.name}`;

      showModal(() => (
        <Bulma.Modal.Card.Wrapper>
          <Bulma.Modal.Card.Header>
            <Bulma.Modal.Card.Title>{titleModal}</Bulma.Modal.Card.Title>
            {/* eslint-disable-next-line react/button-has-type */}
            <button className="delete" aria-label="close" onClick={hideModal} />
          </Bulma.Modal.Card.Header>
          <Bulma.Modal.Card.Body>
            <div className="gene-expression-modal-grid">
              {columns.map((col) => (
                <React.Fragment key={col.key}>
                  <div className="label">{col.text}</div>
                  <div>
                    {typeof onRenderCell === 'function'
                      ? onRenderCell(
                          { cell: item, key: col.key },
                          defaultRender,
                          {
                            expandAction: () => {},
                            isExpanded: true,
                          }
                        )
                      : defaultRender(item, col.key)}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </Bulma.Modal.Card.Body>
        </Bulma.Modal.Card.Wrapper>
      ));
    },
    [columns, onRenderCell]
  );
  const [isExpanded, setIsExpanded] = React.useState({});
  const expandAction = React.useCallback(
    (key) => () =>
      setIsExpanded((prev) => ({
        ...prev,
        [key]: !prev[key],
      })),
    []
  );

  const showTableModalButton = React.useMemo(
    () => hasColumnsTableHidden(table?.current?.offsetWidth || width, columns),
    [width, columns]
  );

  return (
    <div>
      {title && (
        <p className="has-text-centered has-text-weight-semibold mb-1">
          {title}
        </p>
      )}
      <div className="table-container">
        <table
          ref={table}
          className={classnames(
            'table',
            { sortable, 'is-fullwidth': fullwidth, 'is-striped': striped },
            classNames
          )}
        >
          <thead>
            <tr>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              {showTableModalButton && <th />}
              {columns.map((item, key) => {
                if (typeof item === 'object') {
                  if (
                    isHideMediaQuery(
                      table?.current?.offsetWidth || width,
                      item.hide
                    )
                  )
                    return null;
                  return (
                    <th
                      key={item.key}
                      onClick={
                        sortable ? defineSortOption(item.key) : undefined
                      }
                      style={item.style}
                    >
                      {item.abbr && <abbr title={item.abbr} />}
                      {item.text}
                      {/* //todo css */}
                      {cssSortOption(item.key, sortOption)}
                    </th>
                  );
                }
                return <th key={key}>{item}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {data.map((row, key) => (
              <tr
                key={key}
                className={classnames(
                  { 'is-expanded': isExpanded[key] },
                  onRenderRow
                    ? onRenderRow(row, key > 0 ? data[key - 1] : null)
                    : undefined
                )}
              >
                {showTableModalButton && (
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
                  <td
                    className="table-modal-button"
                    onClick={showModalDetails(row)}
                  >
                    <ion-icon name="add-circle" />
                  </td>
                )}
                {Array.isArray(row) &&
                  row.map((cell, cellKey) => (
                    <td key={`${key}-${cellKey}`}>
                      {onRenderCell
                        ? onRenderCell(
                            { cell, key: cellKey, keyRow: key },
                            defaultRender,
                            {
                              expandAction: expandAction(key),
                              isExpanded: isExpanded[key],
                            }
                          )
                        : defaultRender(cell, cellKey)}
                    </td>
                  ))}
                {typeof row &&
                  !Array.isArray(row) &&
                  columns.map((c, keyCol) =>
                    isHideMediaQuery(
                      table?.current?.offsetWidth || width,
                      c.hide
                    ) ? null : (
                      <td key={`${key}-col-${keyCol}`}>
                        {onRenderCell
                          ? onRenderCell(
                              { cell: row, key: c.key || keyCol, keyRow: key },
                              defaultRender,
                              {
                                expandAction: expandAction(key),
                                isExpanded: isExpanded[key],
                              }
                            )
                          : null}
                      </td>
                    )
                  )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
