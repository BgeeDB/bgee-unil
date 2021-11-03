/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import PATHS from '../../routes/paths';
import { CardSpecies } from '../../components/CustomCard';
import useQuery from '../../hooks/useQuery';
import Bulma from '../../components/Bulma';
import DlProcessedExpressionValuesSpeciesModal from '../../components/Modal/DlProcessedExpressionValuesSpeciesModal';
import { ModalContext } from '../../contexts/ModalContext';
import CreativeCommons from '../../components/CreativeCommons';
import api from '../../api';

const ProcessedExpressionValues = () => {
  const history = useHistory();
  const { showModal } = React.useContext(ModalContext);
  const [speciesList, setSpeciesList] = React.useState([]);
  const [kwList, setKwList] = React.useState({});
  const [search, setSearch] = React.useState('');
  const filteredSpecies = React.useMemo(() => {
    const tmp = JSON.parse(JSON.stringify(speciesList));
    if (search === '') return tmp;
    const regExp = new RegExp(search, 'i');
    return tmp.filter(({ id }) =>
      !kwList[id] ? false : Boolean(kwList[id].find((a) => regExp.test(a)))
    );
  }, [speciesList, search, kwList]);
  const speciesID = useQuery('id');
  React.useEffect(() => {
    if (speciesID) {
      const species = speciesList.find((s) => s.id.toString() === speciesID);
      console.log(species);
      if (species) {
        const files = {
          affymetrixData: species.downloadFiles.find(
            (d) => d.category === 'affy_data'
          ),
          affymetrixAnnot: species.downloadFiles.find(
            (d) => d.category === 'affy_annot'
          ),
          rnaSeqData: species.downloadFiles.find(
            (d) => d.category === 'rnaseq_data'
          ),
          rnaSeqAnnot: species.downloadFiles.find(
            (d) => d.category === 'rnaseq_annot'
          ),
          fullLengthAnnot: species.downloadFiles.find(
            (d) => d.category === 'full_length_annot'
          ),
          fullLengthData: species.downloadFiles.find(
            (d) => d.category === 'full_length_data'
          ),
        };
        console.log(files);
        showModal(
          <DlProcessedExpressionValuesSpeciesModal
            species={species}
            files={files}
          />,
          {
            onClose: () => () => {
              history.push(PATHS.DOWNLOAD.PROCESSED_EXPRESSION_VALUES);
            },
          }
        );
      }
    }
  }, [speciesID, speciesList]);
  React.useEffect(() => {
    api.search.species.processedValues().then((res) => {
      setSpeciesList(
        res.data.downloadFilesGroups.map((o) => ({
          ...o,
          ...o.members[0],
        }))
      );
      setKwList(res.data.speciesIdToKeywords);
    });
  }, []);

  return (
    <>
      <div className="content has-text-centered">
        <Bulma.Title size={5}>Processed expression values</Bulma.Title>
      </div>
      <p>
        This page provides annotations and experiment information (e.g.,
        annotations to anatomy and development, quality scores used in QCs, chip
        or library information), and processed expression values (e.g., read
        counts, TPM and FPKM values, log values of Affymetrix probeset
        normalized signal intensities). Click on a species to browse files
        available for download. It is possible to download these data directly
        into R using our{' '}
        <a
          className="external-link"
          href="https://bioconductor.org/packages/BgeeDB/"
        >
          R package
        </a>
        . See also{' '}
        <Link
          to={PATHS.DOWNLOAD.GENE_EXPRESSION_CALLS}
          className="internal-link"
        >
          gene expression calls
        </Link>
        . All data are available under the{' '}
        <a
          className="external-link"
          href="https://creativecommons.org/publicdomain/zero/1.0/"
        >
          Creative Commons Zero license (CC0)
        </a>
        .
      </p>
      <div>
        <Bulma.Card className="search-input mx-auto my-3">
          <Bulma.Card.Body>
            <div className="content">
              <div className="field">
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label className="label" htmlFor="search-species">
                  Search species
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="search-species"
                    placeholder="Scientific name, common name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </Bulma.Card.Body>
        </Bulma.Card>
      </div>
      <Bulma.Card className="mt-4">
        <Bulma.Card.Header>
          <Bulma.Card.Header.Title className="is-size-4 has-text-primary">
            Species with data in Bgee{' '}
            <span className="ml-2 has-text-grey is-size-7">
              (click on species to see more details)
            </span>
          </Bulma.Card.Header.Title>
        </Bulma.Card.Header>
        <Bulma.Card.Body>
          <div className="content">
            <div className="grid-species">
              {filteredSpecies.map((s, key) => (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
                <Link key={key} className="center-in-grid" to={`?id=${s.id}`}>
                  <CardSpecies {...s} />
                </Link>
              ))}
            </div>
          </div>
        </Bulma.Card.Body>
      </Bulma.Card>
      <Bulma.Columns className="mt-4">
        <Bulma.C size={12}>
          <CreativeCommons />
        </Bulma.C>
      </Bulma.Columns>
    </>
  );
};

export default ProcessedExpressionValues;
