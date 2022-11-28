import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Select from 'react-select';
import api from '../../../api';
import TagInput from '../../../components/TagInput/TagInput';
import Button from '../../../components/Bulma/Button/Button';
import Bulma from '../../../components/Bulma';
import Table from '../../../components/Table';
import HelpIcon from '../../../components/HelpIcon';
import { MEDIA_QUERIES } from '../../../helpers/constants/mediaQueries';
import AutoCompleteSearch from '../../../components/AutoCompleteSearch/AutoCompleteSearch';
import obolibraryLinkFromID from '../../../helpers/obolibraryLinkFromID';
import './presenceExpression.scss';

const EMPTY_SPECIES_VALUE = { label: 'Any species', value: '' };

const PresenceExpression = ({ children, searchTerm = '' }) => {
  const CUSTOM_FIELDS = [
    {
      key: 'anat',
      text: 'Anatomy',
    },
    {
      key: 'devStage',
      text: 'Development and life stage stage',
    },
    {
      key: 'sex',
      text: 'Sex',
    },
    {
      key: 'strain',
      text: 'Strain',
    },
  ];

  const DATA_TYPES = [
    {
      key: 'AFFYMETRIX',
      text: 'Affymetrix',
    },
    {
      key: 'EST',
      text: 'EST',
    },
    {
      key: 'IN_SITU',
      text: 'In Situ hybridization',
    },
    {
      key: 'RNA_SEQ',
      text: 'scRNA Seq',
    },
    {
      key: 'FULL_LENGTH',
      text: 'bulk RNA-Seq',
    },
  ];

  const [speciesList, setSpeciesList] = useState([]);
  const [selectedTissue, setSelectedTissue] = useState([]);
  const [selectedStrain, setSelectedStrain] = useState([]);
  const [selectedCellTypes, setSelectedCellTypes] = useState([]);
  const [selectedGene, setSelectedGene] = useState([]);
  const [cFields, setCFields] = useState({ anat: true });
  const [dataType, setDataTypes] = useState(DATA_TYPES.map((d) => d.key));
  const [show, setShow] = useState(true);
  const [speciesValue, setSpeciesValue] = useState(EMPTY_SPECIES_VALUE);

  const renderOption = useCallback((option) => (
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
  ));
  // {
  //   let redPart;
  //   let firstPart;
  //   let lastPart;

  //   if (search) {
  //     const firstIndex = option.indexOf(search);
  //     if (firstIndex === 0) {
  //       redPart = option.substring(firstIndex, search.length);
  //       lastPart = option.substring(search.length, option.length);
  //     } else {
  //       firstPart = option.substring(0, firstIndex);
  //       redPart = option.substring(firstIndex, search.length + 1);
  //       lastPart = option.substring(search.length + 1, option.length);
  //     }
  //   }
  //   return (
  //     <span>
  //       {firstPart}
  //       <strong className="has-text-primary">{redPart}</strong>
  //       {lastPart}
  //     </span>
  //   );
  // }, []);

  const renderOptionCellType = useCallback((option) => (
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
  ));

  const renderOptionStrain = useCallback((option) => option.match);

  const renderOptionTissue = useCallback((option) => (
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
  ));

  const getOptionsFunction = useCallback(async (search) => {
    if (search) {
      // return api.search.genes.autoCompleteGene(search, 'todo').then((resp) => {
      //   console.log(resp.data.result.geneMatches);
      //   if (resp.code === 200 && resp.data.matchCount !== 0) {
      //     return resp.data.result.geneMatches;
      //   }
      //   return [];
      // });
    }
    return [];
  }, []);

  const getOptionsFunctionCellTypes = useCallback(async (search) => {
    if (search) {
      // return api.search.genes.autoCompleteCellTypes(search).then((resp) => {
      //   if (resp.code === 200) {
      //     return resp.data.result.searchMatches;
      //   }
      //   return [];
      // });
    }
    return [];
  }, []);

  const getOptionsFunctionStrain = useCallback(async (search) => {
    if (search) {
      // return api.search.genes.autoCompleteStrain(search).then((resp) => {
      //   if (resp.code === 200) {
      //     return resp.data.result.searchMatches;
      //   }
      //   return [];
      // });
    }
    return [];
  }, []);

  const getOptionsFunctionTissue = useCallback(async (search) => {
    if (search) {
      // return api.search.genes.autoCompleteTissue(search).then((resp) => {
      //   if (resp.code === 200) {
      //     return resp.data.result.searchMatches;
      //   }
      //   return [];
      // });
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
      value: `${s.genus.substr(0, 1)} ${s.speciesName} ${
        s.name ? `${s.name}` : ''
      }`,
    }));
    return [EMPTY_SPECIES_VALUE, ...list];
  }, [speciesList]);

  const customHeader = (searchElement, pageSizeElement) => (
    <Bulma.Columns vCentered>
      <Bulma.C size={6}>
        <div className="field has-addons">{searchElement}</div>
      </Bulma.C>
      <Bulma.C size={6}>
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
              <label className="title-form">
                Search for Presence/Absence expression calls
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
                    <input type="checkbox" /> Including substructures
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
                    <input type="checkbox" /> Including substructures
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
                    <input type="checkbox" /> Including substructures
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
                <label>
                  Data type
                  <HelpIcon
                    title="Data type"
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

                <div className="is-flex is-flex-wrap-wrap gene-expr-fields-wrapper mt-2">
                  {DATA_TYPES.map((c) => (
                    <label
                      className="checkbox ml-2 is-size-7 is-flex is-align-items-center"
                      key={c.key}
                    >
                      <input
                        type="checkbox"
                        checked={dataType.find((d) => d === c.key) || false}
                        onChange={(e) => {
                          setDataTypes((prev) => {
                            const curr = [...prev];
                            if (e.target.checked) {
                              curr.push(c.key);
                            } else {
                              const pos = curr.findIndex((d) => d === c.key);
                              if (pos >= 0) curr.splice(pos, 1);
                            }
                            return curr;
                          });
                        }}
                      />
                      <b className="mx-1">{c.text}</b>
                    </label>
                  ))}
                  <Bulma.Button
                    className="search-form"
                    disabled={
                      JSON.stringify(dataType.sort()) ===
                      JSON.stringify(DATA_TYPES.map((d) => d.key).sort())
                    }
                    onClick={() => setDataTypes(DATA_TYPES.map((d) => d.key))}
                  >
                    Select All
                  </Bulma.Button>
                  <Bulma.Button
                    className="search-form"
                    disabled={dataType.length === 0}
                    onClick={() => setDataTypes([])}
                  >
                    Unselect All
                  </Bulma.Button>
                </div>
                <div className="mt-4">
                  <label>
                    Conditions parameters
                    <HelpIcon
                      title="Conditions parameters"
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
                  <div className="is-flex is-flex-wrap-wrap gene-expr-fields-wrapper mt-2">
                    {CUSTOM_FIELDS.map((c) => (
                      <label
                        className="checkbox ml-2 is-size-7 is-flex is-align-items-center"
                        key={c.key}
                      >
                        <input
                          type="checkbox"
                          checked={cFields[c.key] || false}
                          onChange={(e) => {
                            setCFields((prev) => ({
                              ...prev,
                              [c.key]: e.target.checked || undefined,
                            }));
                          }}
                        />
                        <b className="mx-1">{c.text}</b>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="submit-reinit">
                  <Button type="submit">Submit</Button>
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
        <label className="title-form">
          Search for Presence/Absence expression calls
        </label>
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
            { text: 'Gene', key: 'gene', hide: MEDIA_QUERIES.MOBILE_P },
            { text: 'Anatomy', key: 'anatomy' },
            { text: 'Sex', key: 'sex' },
            { text: 'Strain', key: 'strain' },
            { text: 'FDR value', key: 'fdr' },
            { text: 'Data type support', key: 'data' },
          ]}
          data={['test']}
          customHeader={customHeader}
        />
      </div>
    </>
  );
};

export default PresenceExpression;
