/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useHistory } from 'react-router-dom';
import classnames from '../../helpers/classnames';
import GeneExpressionCallsTabSingle from './GeneExpressionCallsTabSingle';
import GeneExpressionCallsTabMulti from './GeneExpressionCallsTabMulti';
import useQuery from '../../hooks/useQuery';
import GEC_TABS from '../../helpers/constants/GecTabs';

// todo rework link with global var
// todo which link do we need ? anchor? needed for sharing?

const GeneExpressionCallsTabs = () => {
  const cat = useQuery('cat');
  const history = useHistory();

  const onClick = React.useCallback(
    (key) => () => {
      history.push(`?cat=${key}`);
    },
    []
  );
  React.useEffect(() => {
    if (!cat) history.push(`?cat=${GEC_TABS.CAT.SINGLE}`);
  }, [cat]);

  return (
    <>
      <div className="tabs is-centered">
        <ul>
          <li
            className={classnames({ 'is-active': cat === GEC_TABS.CAT.SINGLE })}
          >
            <a onClick={onClick(GEC_TABS.CAT.SINGLE)}>
              Single-species download files
            </a>
          </li>
          <li
            className={classnames({ 'is-active': cat === GEC_TABS.CAT.MULTI })}
          >
            <a onClick={onClick(GEC_TABS.CAT.MULTI)}>
              Multi-species download files
            </a>
          </li>
        </ul>
      </div>
      {cat === GEC_TABS.CAT.SINGLE && <GeneExpressionCallsTabSingle />}
      {cat === GEC_TABS.CAT.MULTI && <GeneExpressionCallsTabMulti />}
    </>
  );
};

export default GeneExpressionCallsTabs;
