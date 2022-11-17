import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Select from 'react-select';
import api from '../../../api';
import Button from '../../../components/Bulma/Button/Button';
import Bulma from '../../../components/Bulma';
import Table from '../../../components/Table';
import HelpIcon from '../../../components/HelpIcon';
import { MEDIA_QUERIES } from '../../../helpers/constants/mediaQueries';
import AutoCompleteSearch from '../../../components/AutoCompleteSearch/AutoCompleteSearch';
import './rawDataAnnotations.scss';
import TagInput from '../../../components/TagInput/TagInput';
import obolibraryLinkFromID from '../../../helpers/obolibraryLinkFromID';

const EMPTY_SPECIES_VALUE = { label: 'Any species', value: '' };

const RawDataAnnotations = ({ children, searchTerm = '' }) => {
  const [speciesList, setSpeciesList] = useState([]);
  const [selectedTissue, setSelectedTissue] = useState([]);
  const [selectedStrain, setSelectedStrain] = useState([]);
  const [selectedCellTypes, setSelectedCellTypes] = useState([]);
  const [selectedGene, setSelectedGene] = useState([]);
  const [show, setShow] = useState(true);
  const [speciesValue, setSpeciesValue] = useState(EMPTY_SPECIES_VALUE);
  const [speciesSexe, setSpeciesSexe] = useState([]);

  // useEffect(() => {
  //   api.search.species.speciesDevelopmentSexe().then((resp) => {
  //     console.log(resp.data.requestedDetails.resquestedSpeciesSexes);
  //     if (resp.code === 200) {
  //       setSpeciesSexe(resp.data.requestDetails.requestedSpeciesSexes);
  //     } else {
  //       setSpeciesSexe([]);
  //     }
  //   });
  // }, [speciesValue]);

  const renderOption = useCallback(
    (option, search) => (
      <div>
        {option.gene.name}{' '}
        <a
          href={`http://localhost:3000/gene/${option.gene.geneId}`}
          target="_blank"
          rel="noreferrer"
        >
          <ion-icon name="open-outline" />
        </a>
      </div>
    )
    // let redPart;
    // let firstPart;
    // let lastPart;
    // const searchedText = option.gene.name;

    // if (search) {
    //   const firstIndex = searchedText.indexOf(search);
    //   if (firstIndex === 0) {
    //     redPart = searchedText.substring(firstIndex, search.length);
    //     lastPart = searchedText.substring(search.length, searchedText.length);
    //   } else {
    //     firstPart = searchedText.substring(0, firstIndex);
    //     redPart = searchedText.substring(firstIndex, search.length + 1);
    //     lastPart = searchedText.substring(
    //       search.length + 1,
    //       searchedText.length
    //     );
    //   }
    // }
    // console.log('coucou', searchedText);
    // return (
    //   <span>
    //     {firstPart}
    //     <strong className="has-text-primary">
    //       {redPart}{' '}
    //       <a
    //         href={`http://localhost:3000/gene/${option.gene.geneId}`}
    //         target="_blank"
    //         rel="noreferrer"
    //       >
    //         <ion-icon name="open-outline" />
    //       </a>
    //     </strong>
    //     {lastPart}
    //   </span>
    // );
  );

  const renderOptionCellType = useCallback(
    (option, search) => (
      <div>
        {option.object.name}{' '}
        <a
          href={obolibraryLinkFromID(option.object.id)}
          target="_blank"
          rel="noreferrer"
        >
          <ion-icon name="open-outline" />
        </a>
      </div>
    )
    // let redPart;
    // let firstPart;
    // let lastPart;

    // if (search) {
    //   const firstIndex = option.object.name.indexOf(search);
    //   if (firstIndex === 0) {
    //     redPart = option.object.name.substring(firstIndex, search.length);
    //     lastPart = option.object.name.substring(search.length, option.length);
    //   } else {
    //     firstPart = option.object.name.substring(0, firstIndex);
    //     redPart = option.object.name.substring(firstIndex, search.length + 1);
    //     lastPart = option.object.name.substring(
    //       search.length + 1,
    //       option.object.name.length
    //     );
    //   }
    // }
    // <span>
    //   {firstPart}
    //   <strong className="has-text-primary">{redPart}</strong>
    //   {lastPart}
    // </span>
  );

  const renderOptionStrain = useCallback((option, search) => (
    <div>{option.match}</div>
  ));

  const renderOptionTissue = useCallback(
    (option, search) => (
      <div>
        {option.object.name}{' '}
        <a
          href={obolibraryLinkFromID(option.object.id)}
          target="_blank"
          rel="noreferrer"
        >
          <ion-icon name="open-outline" />
        </a>
      </div>
    )

    // let redPart;
    // let firstPart;
    // let lastPart;

    // if (search) {
    //   const firstIndex = option.object.name.indexOf(search);
    //   if (firstIndex === 0) {
    //     redPart = option.object.name.substring(firstIndex, search.length);
    //     lastPart = option.object.name.substring(search.length, option.length);
    //   } else {
    //     firstPart = option.object.name.substring(0, firstIndex);
    //     redPart = option.object.name.substring(firstIndex, search.length + 1);
    //     lastPart = option.object.name.substring(
    //       search.length + 1,
    //       option.object.name.length
    //     );
    //   }
    // }
    // <span>
    //   {firstPart}
    //   <strong className="has-text-primary">{redPart}</strong>
    //   {lastPart}
    // </span>
  );

  const getOptionsFunction = useCallback(async (search) => {
    if (search) {
      return api.search.genes.autoCompleteGene(search).then((resp) => {
        console.log(resp.data.result.geneMatches);
        if (resp.code === 200 && resp.data.matchCount !== 0) {
          return resp.data.result.geneMatches;
        }
        return [];
      });
    }
    return [];
  }, []);

  const getOptionsFunctionCellTypes = useCallback(async (search) => {
    if (search) {
      return api.search.genes.autoCompleteCellTypes(search).then((resp) => {
        if (resp.code === 200) {
          return resp.data.result.searchMatches;
        }
        return [];
      });
    }
    return [];
  }, []);

  const getOptionsFunctionStrain = useCallback(async (search) => {
    if (search) {
      return api.search.genes.autoCompleteStrain(search).then((resp) => {
        if (resp.code === 200) {
          return resp.data.result.searchMatches;
        }
        return [];
      });
    }
    return [];
  }, []);

  const getOptionsFunctionTissue = useCallback(async (search) => {
    if (search) {
      return api.search.genes.autoCompleteTissue(search).then((resp) => {
        if (resp.code === 200) {
          return resp.data.result.searchMatches;
        }
        return [];
      });
    }
    return [];
  }, []);

  useEffect(() => {
    api.search.species.list().then((resp) => {
      if (resp.code === 200) {
        setSpeciesList(resp.data.species);
      } else {
        setSpeciesList([]);
      }
    });
  }, []);

  const metaKeywords = useMemo(() => {
    const list = speciesList.map((s) => ({
      label: `${s.genus.substr(0, 1)} ${s.speciesName} ${
        s.name ? `${s.name}` : ''
      }`,
      value: s.id,
    }));
    return [EMPTY_SPECIES_VALUE, ...list];
  }, [speciesList]);

  const customHeader = (searchElement, pageSizeElement) => (
    <Bulma.Columns vCentered>
      <Bulma.C>
        <div>{pageSizeElement}</div>
      </Bulma.C>
    </Bulma.Columns>
  );

  const onSelectOptionGene = useCallback((option) => {
    setSelectedGene((gene) => [...gene, option]);
  }, []);

  const onRemoveOptionGene = useCallback((option) => {
    setSelectedGene((gene) => gene.filter((c) => c !== option));
  });

  const onSelectOptionCellTypes = useCallback((option) => {
    setSelectedCellTypes((cellTypes) => [...cellTypes, option]);
  }, []);

  const onRemoveOptionCellTypes = useCallback((option) => {
    setSelectedCellTypes((cellTypes) =>
      cellTypes.filter((c) => c.object.id !== option.object.id)
    );
  }, []);

  const onSelectOptionTissue = useCallback((option) => {
    setSelectedTissue((tissue) => [...tissue, option]);
  }, []);

  const onRemoveOptionTissue = useCallback((option) => {
    setSelectedTissue((tissue) =>
      tissue.filter((c) => c.object.id !== option.object.id)
    );
  }, []);

  const onSelectOptionStrain = useCallback((option) => {
    setSelectedStrain((strain) => [...strain, option]);
  }, []);

  const onRemoveOptionStrain = useCallback((option) => {
    setSelectedStrain((strain) =>
      strain.filter((c) => c.object !== option.object)
    );
  }, []);

  return (
    <>
      <div className="container">
        {show && (
          <div className="row">
            <div className="selector col-sm-6">
              <label className="title-raw">
                Search for Raw data annotations
              </label>
              <div className="mb-2">
                <label>
                  Species
                  <HelpIcon
                    title="Species"
                    style={{
                      position: 'absolute',
                    }}
                    content={
                      <>
                        By default, all developmental and life stages are
                        considered for the enrichment analysis. It is possible
                        to provide a custom selection of developmental and life
                        stages, selecting one or several developmental and life
                        stages.
                      </>
                    }
                  />
                </label>
                <Select
                  options={metaKeywords}
                  className="form-control"
                  defaultValue={EMPTY_SPECIES_VALUE}
                  onChange={(e) => setSpeciesValue(e)}
                />
              </div>
              {speciesValue.value && (
                <div>
                  <div>
                    <label>
                      Cell types
                      <HelpIcon
                        title="Cell types"
                        style={{
                          position: 'absolute',
                        }}
                        content={
                          <>
                            By default, all developmental and life stages are
                            considered for the enrichment analysis. It is
                            possible to provide a custom selection of
                            developmental and life stages, selecting one or
                            several developmental and life stages.
                          </>
                        }
                      />
                    </label>
                    <AutoCompleteSearch
                      searchTerm={searchTerm}
                      placeholder="Search cell type"
                      renderOption={renderOptionCellType}
                      getOptionsFunction={getOptionsFunctionCellTypes}
                      onSelectOption={onSelectOptionCellTypes}
                      onRemoveOption={onRemoveOptionCellTypes}
                      selectedOptions={selectedCellTypes}
                    >
                      {children}
                    </AutoCompleteSearch>
                    <input type="checkbox" /> Including substrcutures
                  </div>
                  <div className="mb-2">
                    <label>
                      Tissue
                      <HelpIcon
                        title="Tissue"
                        style={{
                          position: 'absolute',
                        }}
                        content={
                          <>
                            By default, all developmental and life stages are
                            considered for the enrichment analysis. It is
                            possible to provide a custom selection of
                            developmental and life stages, selecting one or
                            several developmental and life stages.
                          </>
                        }
                      />
                    </label>
                    <AutoCompleteSearch
                      searchTerm={searchTerm}
                      placeholder="Search tissue"
                      renderOption={renderOptionTissue}
                      getOptionsFunction={getOptionsFunctionTissue}
                      onSelectOption={onSelectOptionTissue}
                      onRemoveOption={onRemoveOptionTissue}
                      selectedOptions={selectedTissue}
                    >
                      {children}
                    </AutoCompleteSearch>
                    <input type="checkbox" /> Including substrcutures
                  </div>
                  <div>
                    <label>
                      Development and life stages
                      <HelpIcon
                        title="Developmental and life stages"
                        style={{
                          position: 'absolute',
                        }}
                        content={
                          <>
                            By default, all developmental and life stages are
                            considered for the enrichment analysis. It is
                            possible to provide a custom selection of
                            developmental and life stages, selecting one or
                            several developmental and life stages.
                          </>
                        }
                      />
                    </label>
                    <Select />
                    <input type="checkbox" /> Including substrcutures
                  </div>
                  <div>Sex</div>
                  <div>
                    <input type="checkbox" /> Male <input type="checkbox" />{' '}
                    Female <input type="checkbox" /> N/A
                  </div>
                </div>
              )}
            </div>
            <div className="col-md-6">
              <div className="input-form">
                {speciesValue.value && (
                  <>
                    <div className="mb-2">
                      <label>
                        Strain
                        <HelpIcon
                          title="Strain"
                          style={{
                            position: 'absolute',
                          }}
                          content={
                            <>
                              By default, all developmental and life stages are
                              considered for the enrichment analysis. It is
                              possible to provide a custom selection of
                              developmental and life stages, selecting one or
                              several developmental and life stages.
                            </>
                          }
                        />
                      </label>
                      <AutoCompleteSearch
                        searchTerm={searchTerm}
                        placeholder="Search strain"
                        renderOption={renderOptionStrain}
                        getOptionsFunction={getOptionsFunctionStrain}
                        onSelectOption={onSelectOptionStrain}
                        onRemoveOption={onRemoveOptionStrain}
                        selectedOptions={selectedStrain}
                      >
                        {children}
                      </AutoCompleteSearch>
                    </div>
                    <div className="mb-2">
                      <label>
                        Gene
                        <HelpIcon
                          title="Gene"
                          style={{
                            position: 'absolute',
                          }}
                          content={
                            <>
                              By default, all developmental and life stages are
                              considered for the enrichment analysis. It is
                              possible to provide a custom selection of
                              developmental and life stages, selecting one or
                              several developmental and life stages.
                            </>
                          }
                        />
                      </label>
                      <AutoCompleteSearch
                        searchTerm={searchTerm}
                        placeholder="Search Gene"
                        renderOption={renderOption}
                        getOptionsFunction={getOptionsFunction}
                        onSelectOption={onSelectOptionGene}
                        onRemoveOption={onRemoveOptionGene}
                        selectedOptions={selectedGene}
                      >
                        {children}
                      </AutoCompleteSearch>
                    </div>
                  </>
                )}
                <div className="mb-2">
                  <label>
                    Experiment or assay ID
                    <HelpIcon
                      title="Experiment or assay ID"
                      style={{
                        position: 'absolute',
                      }}
                      content={
                        <>
                          By default, all developmental and life stages are
                          considered for the enrichment analysis. It is possible
                          to provide a custom selection of developmental and
                          life stages, selecting one or several developmental
                          and life stages.
                        </>
                      }
                    />
                  </label>
                  <TagInput />
                </div>
                <div className="submit-reinit">
                  <Button className="submit" type="submit">
                    Submit
                  </Button>
                  <Button className="reinit">Reinitialize</Button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="control is-flex is-align-items-center">
          <button
            className="button mr-2 mb-5"
            type="button"
            onClick={() => setShow(!show)}
          >
            {show ? 'Hide Filter' : 'Show Filter'}
          </button>
        </div>
        <label className="title-raw">Raw data annotations results</label>
        <div>
          <div className="categorie">
            <Select className="cat-child" placeholder="Categorie 1" />
            <Select className="cat-child" placeholder="Categorie 2" />
            <Select className="cat-child" placeholder="Categorie 3" />
            <Select className="cat-child" placeholder="Categorie 4" />
            <Select className="cat-child" placeholder="Categorie 5" />
          </div>
        </div>
        <Table
          pagination
          sortable
          classNamesTable="is-striped"
          columns={[
            { text: 'Exp ID', key: 'exp', hide: MEDIA_QUERIES.MOBILE_P },
            { text: 'Library ID', key: 'library' },
            { text: 'Sample ID', key: 'sample' },
            { text: 'Cell Type', key: 'cell_type' },
            { text: 'Tissue', key: 'tissue' },
            { text: 'Development and life stage', key: 'development' },
            { text: 'Sex', key: 'sex' },
            { text: 'Stain', key: 'strain' },
            { text: 'Log 2 RPK threshold', key: 'log2_rpk_threshold' },
            { text: 'Log 2 RPK score', key: 'log2_rpk_score' },
            { text: 'Anatomical structure ID', key: 'anat_struct_id' },
            { text: 'Gene ID', key: 'gene_id' },
            { text: 'Direction Flag', key: 'direction_flag' },
            { text: 'Quality', key: 'quality' },
          ]}
          data={['test']}
          customHeader={customHeader}
        />
      </div>
    </>
  );
};

export default RawDataAnnotations;
