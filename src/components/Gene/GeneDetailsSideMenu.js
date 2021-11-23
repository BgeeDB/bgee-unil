/* eslint-disable jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import GENE_DETAILS_HTML_IDS from '../../helpers/constants/GeneDetailsHtmlIds';

const sideMenuElemArray = [
  {
    domId: GENE_DETAILS_HTML_IDS.GENERAL_INFORMATION,
    name: 'General information',
  },
  { domId: GENE_DETAILS_HTML_IDS.EXPRESSION, name: 'Expression' },
];

const GeneDetailsSideMenu = ({ homologs = null }) => {
  const history = useHistory();
  const location = useLocation();
  const [sideMenuElem, setSideMenuElem] = useState(sideMenuElemArray);

  useEffect(() => {
    if (homologs?.paralogs > 0 && homologs?.orthologs > 0) {
      setSideMenuElem([
        ...sideMenuElem,
        { domId: GENE_DETAILS_HTML_IDS.ORTHOLOGS, name: 'Orthologs' },
        {
          domId: GENE_DETAILS_HTML_IDS.PARALOGS,
          name: 'Paralogs',
        },
        { domId: GENE_DETAILS_HTML_IDS.XREFS, name: 'Cross-references' },
      ]);
    } else if (homologs?.paralogs === 0 && homologs?.orthologs > 0) {
      setSideMenuElem([
        ...sideMenuElem,
        { domId: GENE_DETAILS_HTML_IDS.ORTHOLOGS, name: 'Orthologs' },
        { domId: GENE_DETAILS_HTML_IDS.XREFS, name: 'Cross-references' },
      ]);
    } else if (homologs?.paralogs > 0 && homologs?.orthologs === 0) {
      setSideMenuElem([
        ...sideMenuElem,
        {
          domId: GENE_DETAILS_HTML_IDS.PARALOGS,
          name: 'Paralogs',
        },
        { domId: GENE_DETAILS_HTML_IDS.XREFS, name: 'Cross-references' },
      ]);
    }
  }, [homologs]);

  const handlerMenuClick = React.useCallback(
    (id) => {
      history.replace(`${location.pathname}${location.search}#${id}`);
    },
    [location]
  );

  return (
    <aside className="menu">
      <ul className="menu-list">
        {sideMenuElem.map((elem) => (
          <li key={elem.domId} onClick={() => handlerMenuClick(elem.domId)}>
            <a className="is-size-5 has-text-weight-semibold">{elem.name}</a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default GeneDetailsSideMenu;
