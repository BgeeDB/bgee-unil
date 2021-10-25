/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import React from 'react';
import classnames from '../../helpers/classnames';
import GeneExpressionCallsTabSingle from './GeneExpressionCallsTabSingle';
import GeneExpressionCallsTabMulti from './GeneExpressionCallsTabMulti';

// todo rework link with global var
// todo which link do we need ? anchor? needed for sharing?

const GeneExpressionCallsTabs = () => {
  const [active, setActive] = React.useState('multi');

  return (
    <>
      <div className="tabs is-centered">
        <ul>
          <li className={classnames({ 'is-active': active === 'single' })}>
            <a onClick={() => setActive('single')}>
              Single-species download files
            </a>
          </li>
          <li className={classnames({ 'is-active': active === 'multi' })}>
            <a onClick={() => setActive('multi')}>
              Multi-species download files
            </a>
          </li>
        </ul>
      </div>
      {active === 'single' && <GeneExpressionCallsTabSingle />}
      {active === 'multi' && <GeneExpressionCallsTabMulti />}
    </>
  );
};

export default GeneExpressionCallsTabs;
