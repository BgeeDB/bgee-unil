/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import React from 'react';
import classnames from '../../helpers/classnames';
import GECSingleExpr from './GECSingleExpr';
import GECSingleDiff from './GECSingleDiff';

const GeneExpressionCallsTabSingle = () => {
  const [active, setActive] = React.useState('single_expr');
  return (
    <>
      <div className="tabs is-centered is-toggle is-toggle-rounded is-small">
        <ul>
          <li className={classnames({ 'is-active': active === 'single_expr' })}>
            <a onClick={() => setActive('single_expr')}>
              Presence/absence of expression
            </a>
          </li>
          <li className={classnames({ 'is-active': active === 'single_diff' })}>
            <a onClick={() => setActive('single_diff')}>
              Over-/under-expression across anatomy or life stages
            </a>
          </li>
        </ul>
      </div>
      {active === 'single_expr' && <GECSingleExpr />}
      {active === 'single_diff' && <GECSingleDiff />}
    </>
  );
};

export default GeneExpressionCallsTabSingle;
