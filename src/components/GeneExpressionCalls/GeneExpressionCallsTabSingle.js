/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useHistory } from 'react-router-dom';
import classnames from '../../helpers/classnames';
import GECSingleExpr from './GECSingleExpr';
import GECSingleDiff from './GECSingleDiff';
import useQuery from '../../hooks/useQuery';
import GEC_TABS from '../../helpers/constants/GecTabs';

const GeneExpressionCallsTabSingle = () => {
  const section = useQuery('section');
  const history = useHistory();

  const onClick = React.useCallback(
    (key) => () => {
      history.push(`?cat=${GEC_TABS.CAT.SINGLE}&section=${key}`);
    },
    []
  );
  React.useEffect(() => {
    if (!section)
      history.push(
        `?cat=${GEC_TABS.CAT.SINGLE}&section=${GEC_TABS.SINGLE.EXPR}`
      );
  }, [section]);

  return (
    <>
      <div className="tabs is-centered is-toggle is-toggle-rounded is-small">
        <ul>
          <li
            className={classnames({
              'is-active': section === GEC_TABS.SINGLE.EXPR,
            })}
          >
            <a onClick={onClick(GEC_TABS.SINGLE.EXPR)}>
              Presence/absence of expression
            </a>
          </li>
          <li
            className={classnames({
              'is-active': section === GEC_TABS.SINGLE.DIFF,
            })}
          >
            <a onClick={onClick(GEC_TABS.SINGLE.DIFF)}>
              Over-/under-expression across anatomy or life stages
            </a>
          </li>
        </ul>
      </div>
      {section === GEC_TABS.SINGLE.EXPR && <GECSingleExpr />}
      {section === GEC_TABS.SINGLE.DIFF && <GECSingleDiff />}
    </>
  );
};

export default GeneExpressionCallsTabSingle;
