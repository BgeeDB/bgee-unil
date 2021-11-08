import React from 'react';
import isPlural from '../../helpers/isPlural';
import { ModalContext } from '../../contexts/ModalContext';

const GenesDetailsModal = ({ data }) => {
  const { hideModal, customOnClose } = React.useContext(ModalContext);
  const { selectedSpecies } = data;

  if (!data || Object.keys(data.detectedSpecies).length === 0) return null;
  return (
    <div className="content">
      <button
        className="modal-close is-large"
        aria-label="close"
        type="button"
        onClick={() => {
          if (customOnClose) {
            customOnClose();
          }
          hideModal();
        }}
      />
      <p>
        {`Selected species: `}
        <i>{`${data.detectedSpecies[selectedSpecies].genes} ${data.detectedSpecies[selectedSpecies].speciesName}`}</i>
        {`, ${data.geneCount[selectedSpecies]} unique genes identified in Bgee`}
      </p>
      {Object.keys(data.detectedSpecies).length > 1 && (
        <>
          <p>Other species detected in ID list: </p>
          <ul className="unordered">
            {Object.entries(data.detectedSpecies).map(([key, value]) =>
              key === selectedSpecies.toString() ? null : (
                <li key={key}>
                  <p>
                    <i>{`${value.genus} ${value.speciesName}`}</i>
                    {`: ${data.geneCount[key]} ${isPlural(
                      'gene',
                      data.geneCount[key]
                    )} identified`}
                  </p>
                </li>
              )
            )}
          </ul>
        </>
      )}
      {data.undeterminedGeneIds.length > 0 && (
        <p>IDs not identified: {data.undeterminedGeneIds.length}</p>
      )}
      {data.notInSelectedSpeciesGeneIds.length > 0 && (
        <>
          <p>ID in other species: </p>

          <ul className="unordered">
            {data.notInSelectedSpeciesGeneIds.slice(0, 10).map((v) => (
              <TextGene key={v} gene={v} />
            ))}
            {data.notInSelectedSpeciesGeneIds.length > 10 && (
              <li>
                <p>...</p>
              </li>
            )}
          </ul>
        </>
      )}

      {data.undeterminedGeneIds.length > 0 && (
        <>
          <p>IDs not identified:</p>
          <ul className="unordered">
            {data.undeterminedGeneIds.slice(0, 10).map((v) => (
              <TextGene key={v} gene={v} />
            ))}
            {data.undeterminedGeneIds.length > 10 && (
              <li>
                <p>...</p>
              </li>
            )}
          </ul>
        </>
      )}
    </div>
  );
};

const TextGene = ({ gene }) => (
  <li>
    <p>{gene}</p>
  </li>
);
export default GenesDetailsModal;
