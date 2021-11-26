/* eslint-disable jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import GENE_DETAILS_HTML_IDS from '../../helpers/constants/GeneDetailsHtmlIds';

const Styles = {
  ulWidth: {
    width: '57%',
  },
};

const GeneDetailsSideMenu = () => {
  const history = useHistory();
  const location = useLocation();

  const handlerMenuClick = React.useCallback(
    (id) => {
      history.replace(`${location.pathname}${location.search}#${id}`);
    },
    [location]
  );

  return (
    <aside className="menu">
      <ul className="menu-list" style={Styles.ulWidth}>
        {sideMenuElem.map((elem) => (
          <li key={elem.domId} onClick={() => handlerMenuClick(elem.domId)}>
            <a className="is-size-5 has-text-weight-semibold">{elem.name}</a>
          </li>
        )}
      </ul>
    </aside>
  );
};

export default GeneDetailsSideMenu;
