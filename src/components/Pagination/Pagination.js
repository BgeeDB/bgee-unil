/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import React from 'react';

const Pagination = ({ current, total, setPage }) => {
  const center = React.useMemo(() => {
    const pages = [];
    const pageBtw = total - 2;
    if (pageBtw <= 3) {
      // eslint-disable-next-line no-plusplus
      for (let i = 1; i <= pageBtw; ++i) pages.push(i + 1);
    } else if (current === 1) {
      pages.push(current + 1);
      pages.push(current + 2);
      pages.push(current + 3);
    } else if (current - 1 === 1) {
      pages.push(current);
      pages.push(current + 1);
      pages.push(current + 2);
    } else if (current + 1 === total) {
      pages.push(current - 2);
      pages.push(current - 1);
      pages.push(current);
    } else if (current === total) {
      pages.push(current - 3);
      pages.push(current - 2);
      pages.push(current - 1);
    } else {
      pages.push(current - 1);
      pages.push(current);
      pages.push(current + 1);
    }

    return pages;
  }, [current, total]);

  if (total === 1) return null;

  return (
    <nav
      className="pagination is-centered"
      role="navigation"
      aria-label="pagination"
    >
      <a
        className="pagination-previous"
        disabled={current === 1}
        onClick={() => setPage(current - 1)}
      >
        Previous
      </a>
      <a
        className="pagination-next"
        disabled={current === total}
        onClick={() => setPage(current + 1)}
      >
        Next page
      </a>
      <ul className="pagination-list">
        <li>
          <a
            className={`pagination-link  ${current === 1 ? 'is-current' : ''}`}
            aria-label="Goto page 1"
            disabled={current === 1}
            onClick={() => setPage(1)}
          >
            1
          </a>
        </li>
        {total > 5 && current > 2 && (
          <li>
            <span className="pagination-ellipsis">&hellip;</span>
          </li>
        )}
        {center.map((page) => (
          <li key={page}>
            <a
              className={`pagination-link  ${
                current === page ? 'is-current' : ''
              }`}
              disabled={current === page}
              aria-label={`Goto page ${page}`}
              onClick={() => setPage(page)}
            >
              {page}
            </a>
          </li>
        ))}
        {total > 5 && current < total - 1 && (
          <li>
            <span className="pagination-ellipsis">&hellip;</span>
          </li>
        )}
        <li>
          <a
            className={`pagination-link  ${
              current === total ? 'is-current' : ''
            }`}
            aria-label={`Goto page ${total}`}
            disabled={current === total}
            onClick={() => setPage(total)}
          >
            {total}
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
