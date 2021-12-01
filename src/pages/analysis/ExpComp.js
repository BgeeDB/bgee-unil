import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Table from '../../components/Table';
import json from './mockExpComp.json';
import staticBuilder, { richTextBuilder } from '../../helpers/staticBuilder';
import useQuery from '../../hooks/useQuery';
import Bulma from '../../components/Bulma';
import api from '../../api';
import PATHS from '../../routes/paths';

const KEYS = {
  'anat-entities': 0,
  'xpr-score': 1,
  'max-xpr-score': 2,
  'gene-present': 3,
  'gene-absent': 4,
  'gene-no-data': 5,
  'species-present': 6,
  'species-absent': 7,
};
const onRenderCell = ({ cell, key }, defaultRender, { expandAction }) => {
  switch (key) {
    case 0:
    case 1:
    case 2:
      return defaultRender(cell, key);
    case 8:
      return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
        <a key={key} className="expand-button" onClick={expandAction}>
          <Bulma.IonIcon name="chevron-down-sharp" />
        </a>
      );
    default:
      // eslint-disable-next-line no-case-declarations
      const expandContent = cell.elements.reduce(
        (r, a) => r.concat(a, { type: 'break_line' }),
        []
      );
      return (
        <div key={key}>
          <p>{`${cell.elements.length} ${cell.name}${
            cell.elements.length > 1 &&
            cell.name.charAt(cell.name.length - 1) !== 's'
              ? 's'
              : ''
          }`}</p>
          <p className="expand-content">{richTextBuilder(expandContent)}</p>
        </div>
      );
  }
};
const customHeader = (searchElement, pageSizeElement) => (
  <Bulma.Columns vCentered>
    <Bulma.C size={3}>
      <div className="is-flex is-flex-direction-column">
        <p>View</p>
      </div>
    </Bulma.C>
    <Bulma.C size={6}>
      <div className="field has-addons">{searchElement}</div>
    </Bulma.C>
    <Bulma.C size={3}>
      <div>{pageSizeElement}</div>
    </Bulma.C>
  </Bulma.Columns>
);

const reduceGeneFct = (regExp) => (a, c) =>
  a ||
  Boolean(regExp.test(c.content[0].text)) ||
  Boolean(regExp.test(c.content[1].content));
const reduceSpeciesFct = (regExp) => (a, c) =>
  a || Boolean(regExp.test(c.text));
const onFilter = (search) => (element) => {
  const regExp = new RegExp(search, 'i');
  return (
    Boolean(regExp.test(element[KEYS['anat-entities']][0].text)) ||
    element[KEYS['gene-present']].elements.reduce(
      reduceGeneFct(regExp),
      false
    ) ||
    element[KEYS['gene-absent']].elements.reduce(
      reduceGeneFct(regExp),
      false
    ) ||
    element[KEYS['gene-no-data']].elements.reduce(
      reduceGeneFct(regExp),
      false
    ) ||
    element[KEYS['species-present']].elements.reduce(
      reduceSpeciesFct(regExp),
      false
    ) ||
    element[KEYS['species-absent']].elements.reduce(
      reduceSpeciesFct(regExp),
      false
    )
  );
};
const onSort = (sortKey, sortDirection) => (elementA, elementB) => {
  let a = elementA[KEYS[sortKey]];
  let b = elementB[KEYS[sortKey]];
  switch (sortKey) {
    case 'anat-entities':
      a = a[0].text.toLowerCase();
      b = b[0].text.toLowerCase();
      break;
    case 'xpr-score':
    case 'max-xpr-score':
      break;
    case 'gene-present':
    case 'gene-absent':
    case 'gene-no-data':
    case 'species-present':
    case 'species-absent':
      a = a.elements.length;
      b = b.elements.length;
      break;
    default:
      return 0;
  }
  if (sortDirection === 'ascending') return a > b ? 1 : -1;
  if (sortDirection === 'descending') return a < b ? 1 : -1;
  return 0;
};

const ExpComp = () => {
  const data = useQuery('data');
  const [searchValue, setSearchValue] = useState('');
  const [hashResponse, setHashResponse] = useState('');
  const history = useHistory();

  React.useEffect(() => {
    if (searchValue !== '') {
      api.topAnat.autoCompleteGenes(searchValue).then((res) => {
        console.log(res);
        const tempHash = 'thisIsMyTemporaryHashInTheURL';
        setHashResponse(tempHash);
      });
    }
  }, [searchValue]);

  const handlerChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handlerClickSearch = () => {
    history.push(
      PATHS.ANALYSIS.EXPRESSION_COMPARISON_RESULT.replace(':hash', hashResponse)
    );
  };

  return (
    <div>
      <Bulma.Section className=" pt-5">
        <div>
          {staticBuilder([
            {
              type: 'title',
              content: 'Expression comparison',
            },
            {
              type: 'text',
              content:
                'Compare expression of several genes. If genes belong to several species, comparisons will be performed in homologous organs. Please enter one gene ID per line.',
            },
          ])}
          <div className="is-flex is-justify-content-center my-3">
            <div className="message" style={{ maxWidth: '500px' }}>
              <header className="message-header">
                <p className="is-size-5">Gene list</p>
              </header>
              <div className="message-body">
                <div className="field">
                  <div className="control">
                    <textarea
                      className="textarea is-small"
                      placeholder="Enter a list of gene IDs (one ID per line or separated by a comma)"
                      rows="10"
                      onChange={handlerChange}
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <button
                      className="button"
                      type="button"
                      onClick={handlerClickSearch}
                    >
                      {i18n.t('analysis.expression-comparison.search-button')}
                    </button>
                  </div>
                </div>
                <div className="field">
                  <p className="is-size-7">
                    Examples:{' '}
                    <Link className="internal-link" to="?data=8798798749849841">
                      SRRM4
                    </Link>{' '}
                    (brain specific genes){' '}
                    <a className="internal-link" to="?data=8798798749849841">
                      Hoxd12
                    </a>{' '}
                    (development pattern genes)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {data && (
          <div>
            <p>Unknown Ensembl IDs:</p>
            {staticBuilder([
              {
                type: 'section',
                title: 'Results',
                children: [
                  {
                    type: 'text',
                    content:
                      'Results are ordered by default by descendant "Conservation score", then ascendant "Genes with absence of expression", then descendant "Max expression score". The order could be changed by clicking on one column, then press shift and click on another column.',
                  },
                ],
              },
            ])}
            {/* <Table */}
            {/*  sortable */}
            {/*  pagination */}
            {/*  classNamesTable="is-striped" */}
            {/*  onFilter={onFilter} */}
            {/*  customSort={onSort} */}
            {/*  columns={[ */}
            {/*    { */}
            {/*      key: 'anat-entities', */}
            {/*      text: 'Anatomical entities', */}
            {/*    }, */}
            {/*    { */}
            {/*      key: 'xpr-score', */}
            {/*      text: 'Conservation score', */}
            {/*    }, */}
            {/*    { */}
            {/*      key: 'max-xpr-score', */}
            {/*      text: 'Max expression score', */}
            {/*    }, */}
            {/*    { */}
            {/*      key: 'gene-present', */}
            {/*      text: 'Genes with presence of expression', */}
            {/*    }, */}
            {/*    { */}
            {/*      key: 'gene-absent', */}
            {/*      text: 'Genes with absence of expression', */}
            {/*    }, */}
            {/*    { */}
            {/*      key: 'gene-no-data', */}
            {/*      text: 'Genes with no data', */}
            {/*    }, */}
            {/*    { */}
            {/*      key: 'species-present', */}
            {/*      text: 'Species with presence of expression', */}
            {/*    }, */}
            {/*    { */}
            {/*      key: 'species-absent', */}
            {/*      text: 'Species with absence of expression', */}
            {/*    }, */}
            {/*    'See details', */}
            {/*  ]} */}
            {/*  data={json} */}
            {/*  customHeader={customHeader} */}
            {/*  onRenderCell={onRenderCell} */}
            {/* /> */}
          </div>
        )}
      </Bulma.Section>
    </div>
  );
};

export default ExpComp;
