import React from 'react';
import { Link } from 'react-router-dom';
import i18n from '../../i18n';
import useQuery from '../../hooks/useQuery';
import ComplexTable from '../../components/ComplexTable';
import PATHS from '../../routes/paths';
// i18n.t('search.anatomical-homology.xxxxxxxxxxxx')

const checkboxes = [
  { id: 0, name: ' Select all' },
  { id: 1, name: ' Homo sapiens' },
  { id: 2, name: ' Mus musculus' },
  { id: 3, name: ' Danio rerio' },
  { id: 4, name: ' Drosophila melanogaster' },
  { id: 5, name: ' Caenorhabditis elegans' },
  { id: 6, name: ' Canis lupus familiaris' },
  { id: 7, name: ' Felis catus' },
  { id: 8, name: ' Equus caballus' },
  { id: 9, name: ' Sus scrofa' },
  { id: 10, name: ' Bos taurus' },
  { id: 11, name: ' Capra hircus' },
  { id: 12, name: ' Ovis aries' },
  { id: 13, name: ' Oryctolagus cuniculus' },
  { id: 14, name: ' Cavia porcellus' },
  { id: 15, name: ' Gallus gallus' },
  { id: 16, name: ' Meleagris gallopavo' },
  { id: 17, name: ' Ornithorhynchus anatinus' },
  { id: 18, name: ' Callithrix jacchus' },
  { id: 19, name: ' Cercocebus atys' },
  { id: 20, name: ' Macaca fascicularis' },
  { id: 21, name: ' Macaca mulatta' },
  { id: 22, name: ' Macaca nemestrina' },
  { id: 23, name: ' Papio anubis' },
  { id: 24, name: ' Gorilla gorilla' },
  { id: 25, name: ' Pan paniscus' },
  { id: 26, name: ' Pan troglodytes' },
  { id: 27, name: ' Microcebus murinus' },
  { id: 28, name: ' Chlorocebus sabaeus' },
  { id: 29, name: ' Manis javanica' },
  { id: 30, name: ' Rattus norvegicus' },
  { id: 31, name: ' Heterocephalus glaber' },
  { id: 32, name: ' Monodelphis domestica' },
  { id: 33, name: ' Xenopus laevis' },
  { id: 34, name: ' Xenopus tropicalis' },
  { id: 35, name: ' Anolis carolinensis' },
  { id: 36, name: ' Lepisosteus oculatus' },
  { id: 37, name: ' Anguilla anguilla' },
  { id: 38, name: ' Astyanax mexicanus' },
  { id: 39, name: ' Esox lucius' },
  { id: 40, name: ' Salmo salar' },
  { id: 41, name: ' Gadus morhua' },
  { id: 42, name: ' Poecilia reticulata' },
  { id: 43, name: ' Oryzias latipes' },
  { id: 44, name: ' Astatotilapia calliptera' },
  { id: 45, name: ' Neolamprologus brichardi' },
  { id: 46, name: ' Scophthalmus maximus' },
  { id: 47, name: ' Gasterosteus aculeatus' },
  { id: 48, name: ' Nothobranchius furzeri' },
  { id: 49, name: ' Branchiostoma lanceolatum' },
  { id: 50, name: ' Latimeria chalumnae' },
  { id: 51, name: ' Drosophila pseudoobscura' },
  { id: 52, name: ' Drosophila simulans' },
];

const onRenderCell =
  (search) =>
  ({ cell, key, keyRow }, defaultRender, { expandAction }) => {
    switch (key) {
      case 'id':
      case 'name':
      case 'organism':
        return (
          <Link
            className="internal-link"
            to={PATHS.SEARCH.GENE_ITEM.replace(':id', cell.id)}
          >
            {cell[key]}
          </Link>
        );
      case 'description':
        return defaultRender('element that match', key);
      default:
        return (
          <p>
            Match: <b>{search}</b>
          </p>
        );
    }
  };
const customHeader = (searchElement, pageSizeElement, showEntriesText) => (
  <div className="columns is-vcentered">
    <div className="column is-6">
      <div className="field has-addons">{searchElement}</div>
    </div>
    <div className="column is-6">
      <div>
        {pageSizeElement}
        <div>{showEntriesText}</div>
      </div>
    </div>
  </div>
);

const AnatomicalHomologySearch = () => {
  const [search, setSearch] = React.useState('');
  const query = useQuery('search');
  const [results, setResults] = React.useState(undefined);

  React.useEffect(() => {
    setSearch(query);
    setResults([
      {
        id: '1354654654',
        name: 'azertyuiop',
        description: 'azertyuiop',
        organism: 'azertyuiop',
      },
      {
        id: '1354654654',
        name: 'azertyuiop',
        description: 'azertyuiop',
        organism: 'azertyuiop',
      },
      {
        id: '1354654654',
        name: 'azertyuiop',
        description: 'azertyuiop',
        organism: 'azertyuiop',
      },
      {
        id: '1354654654',
        name: 'azertyuiop',
        description: 'azertyuiop',
        organism: 'azertyuiop',
      },
      {
        id: '1354654654',
        name: 'azertyuiop',
        description: 'azertyuiop',
        organism: 'azertyuiop',
      },
      {
        id: '1354654654',
        name: 'azertyuiop',
        description: 'azertyuiop',
        organism: 'azertyuiop',
      },
      {
        id: '1354654654',
        name: 'azertyuiop',
        description: 'azertyuiop',
        organism: 'azertyuiop',
      },
      {
        id: '1354654654',
        name: 'azertyuiop',
        description: 'azertyuiop',
        organism: 'azertyuiop',
      },
      {
        id: '1354654654',
        name: 'azertyuiop',
        description: 'azertyuiop',
        organism: 'azertyuiop',
      },
      {
        id: '1354654654',
        name: 'azertyuiop',
        description: 'azertyuiop',
        organism: 'azertyuiop',
      },
      {
        id: '1354654654',
        name: 'azertyuiop',
        description: 'azertyuiop',
        organism: 'azertyuiop',
      },
      {
        id: '1354654654',
        name: 'azertyuiop',
        description: 'azertyuiop',
        organism: 'azertyuiop',
      },
      {
        id: '1354654654',
        name: 'azertyuiop',
        description: 'azertyuiop',
        organism: 'azertyuiop',
      },
      {
        id: '1354654654',
        name: 'azertyuiop',
        description: 'azertyuiop',
        organism: 'azertyuiop',
      },
      {
        id: '1354654654',
        name: 'azertyuiop',
        description: 'azertyuiop',
        organism: 'azertyuiop',
      },
      {
        id: '1354654654',
        name: 'azertyuiop',
        description: 'azertyuiop',
        organism: 'azertyuiop',
      },
      {
        id: '1354654654',
        name: 'azertyuiop',
        description: 'azertyuiop',
        organism: 'azertyuiop',
      },
      {
        id: '1354654654',
        name: 'azertyuiop',
        description: 'azertyuiop',
        organism: 'azertyuiop',
      },
      {
        id: '1354654654',
        name: 'azertyuiop',
        description: 'azertyuiop',
        organism: 'azertyuiop',
      },
      {
        id: '1354654654',
        name: 'azertyuiop',
        description: 'azertyuiop',
        organism: 'azertyuiop',
      },
      {
        id: '1354654654',
        name: 'azertyuiop',
        description: 'azertyuiop',
        organism: 'azertyuiop',
      },
      {
        id: '1354654654',
        name: 'azertyuiop',
        description: 'azertyuiop',
        organism: 'azertyuiop',
      },
      {
        id: '1354654654',
        name: 'azertyuiop',
        description: 'azertyuiop',
        organism: 'azertyuiop',
      },
    ]);
  }, [query]);

  return (
    <div className="section pt-5">
      <div className="content has-text-centered">
        <p className="title is-5">{`${i18n.t(
          'search.anatomical-homology.title'
        )}`}</p>
      </div>
      <p>
        {`${i18n.t('search.anatomical-homology.description')} `}
        <a
          href="https://www.ebi.ac.uk/ols/ontologies/uberon"
          className="external-link"
        >
          here
        </a>
        .
      </p>
      <div>
        <div className="card mx-auto my-3" style={{ maxWidth: 750 }}>
          <div className="card-content">
            <div className="content">
              <div className="field is-flex is-justify-content-space-between">
                <div>
                  <label className="label" htmlFor="search-species">
                    {i18n.t('search.anatomical-homology.anat-label')}
                  </label>
                  <div className="control" style={{ maxWidth: 250 }}>
                    <textarea
                      className="textarea has-fixed-size"
                      name="search-species"
                      rows="10"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="label" htmlFor="search-species">
                    {i18n.t(
                      'search.anatomical-homology.species-common-ancestor-label'
                    )}
                  </label>
                  <div className="control checkboxes">
                    {checkboxes.map(({ id, name }) => (
                      <label
                        className="checkbox is-size-7"
                        key={id}
                        htmlFor={id}
                      >
                        <input type="checkbox" name={id} />
                        <i>{name}</i>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button className="button mr-2" type="button">
                    {i18n.t('global.search')}
                  </button>
                  <p className="mt-2">
                    {`${i18n.t('global.example')}: `}
                    <Link className="internal-link" to="?search=HBB">
                      Lung in human and zebrafish
                    </Link>
                    {', '}
                    <Link className="internal-link" to="?search=HBB">
                      Pharyngeal gill in human and zebrafish
                    </Link>
                    {', '}
                    <Link className="internal-link" to="?search=HBB">
                      T Cell in human and zebrafish
                    </Link>
                    {', Placenta '}
                    <Link className="internal-link" to="?search=HBB">
                      in human and chimpanzee
                    </Link>
                    {' (homologous structure), or  '}
                    <Link className="internal-link" to="?search=HBB">
                      in human and zebrafish
                    </Link>
                    (no homologous structure)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {results && (
        <div>
          <p className="title is-6 gradient-underline">
            {i18n.t('global.results')}
          </p>
          <p className="my-5">{`${i18n.t(
            'search.anatomical-homology.least-common-ancestor'
          )}: Euteleostomi`}</p>
          <ComplexTable
            pagination
            scrollable
            sortable
            classNamesTable="is-striped"
            columns={[
              {
                text: i18n.t('search.anatomical-homology.anat-label'),
                key: 'id',
              },
              {
                text: i18n.t(
                  'search.anatomical-homology.ancestral-taxon-label'
                ),
                key: 'name',
              },
              {
                text: i18n.t('search.anatomical-homology.presence-among-label'),
                key: 'description',
              },
            ]}
            data={results}
            customHeader={customHeader}
            onRenderCell={onRenderCell(search)}
          />
        </div>
      )}
    </div>
  );
};

export default AnatomicalHomologySearch;
