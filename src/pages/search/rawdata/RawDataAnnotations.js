import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Select from 'react-select';
import api from '../../../api';
import Input from '../../../components/Form/Input';
import Button from '../../../components/Bulma/Button/Button';
import Bulma from '../../../components/Bulma';
import Table from '../../../components/Table';
import HelpIcon from '../../../components/HelpIcon';
import { MEDIA_QUERIES } from '../../../helpers/constants/mediaQueries';
import AutoCompleteSearch from '../../../components/AutoCompleteSearch/AutoCompleteSearch';
import './rawDataAnnotations.scss';

const EMPTY_SPECIES_VALUE = { label: 'Any species', value: '' };

const RawDataAnnotations = ({ children, searchTerm = '' }) => {
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
  const [name, setName] = useState('');
  // const [allData, setAllData] = useState([]);
  const [cFields, setCFields] = useState({ anat: true });
  const [dataType, setDataTypes] = useState(DATA_TYPES.map((d) => d.key));
  // const [speciesId, setSpeciesId] = useState([]);
  const [show, setShow] = useState(true);
  const [speciesValue, setSpeciesValue] = useState(EMPTY_SPECIES_VALUE);

  const renderOption = useCallback((option, search) => {
    let redPart;
    let firstPart;
    let lastPart;

    if (search) {
      const firstIndex = option.indexOf(search);
      if (firstIndex === 0) {
        redPart = option.substring(firstIndex, search.length);
        lastPart = option.substring(search.length, option.length);
      } else {
        firstPart = option.substring(0, firstIndex);
        redPart = option.substring(firstIndex, search.length + 1);
        lastPart = option.substring(search.length + 1, option.length);
      }
    }
    return (
      <span>
        {firstPart}
        <strong className="has-text-primary">{redPart}</strong>
        {lastPart}
      </span>
    );
  }, []);

  const renderOptionCellType = useCallback((option) => option.object.name, []);

  const renderOptionStrain = useCallback((option) => option.match);

  const getOptionsFunction = useCallback(async (search) => {
    if (search) {
      return api.search.genes.autoComplete(search).then((resp) => {
        if (resp.code === 200 && resp.data.matchCount !== 0) {
          return resp.data.match;
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

  useEffect(() => {
    api.search.species.list().then((resp) => {
      if (resp.code === 200) {
        setSpeciesList(resp.data.species);
      } else {
        setSpeciesList([]);
      }
    });
  }, []);

  // useEffect(() => {
  //   api.search.species.species().then((resp) => {
  //     if (resp.code === 200) {
  //       setSpeciesId(resp.data.species);
  //     } else {
  //       setSpeciesId([]);
  //     }
  //   });
  // }, []);

  // const handleAdd = () => {
  //   if (name.length !== 0) {
  //     setAllData((newData) => [...newData, name]);
  //     setName('');
  //   }
  // };

  // const handleDelete = (i) => {
  //   allData.splice(i, 1);
  //   setAllData([...allData]);
  // };

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

  // const metaKeywordsDevelopment = useMemo (
  //   () => speciesId.map((s) => ({
  //     // label: `${}`
  //   }))
  // )

  return (
    <>
      <div className="container">
        {show && (
          <div className="row">
            <div className="selector col-sm-6">
              <label className="title-form">
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
                    <Input type="text" placeholder="Search tissue" />
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
                          considered for the enrichment analysis. It is possible
                          to provide a custom selection of developmental and
                          life stages, selecting one or several developmental
                          and life stages.
                        </>
                      }
                    />
                  </label>
                  <AutoCompleteSearch
                    searchTerm={searchTerm}
                    placeholder="Search strain"
                    renderOption={renderOptionStrain}
                    getOptionsFunction={getOptionsFunctionStrain}
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
                          considered for the enrichment analysis. It is possible
                          to provide a custom selection of developmental and
                          life stages, selecting one or several developmental
                          and life stages.
                        </>
                      }
                    />
                  </label>
                  <AutoCompleteSearch
                    searchTerm={searchTerm}
                    placeholder="Search Gene"
                    renderOption={renderOption}
                    getOptionsFunction={getOptionsFunction}
                  >
                    {children}
                  </AutoCompleteSearch>
                </div>
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
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Search experimentor or assay ID"
                  />
                  {/* <Button onClick={handleAdd}>Add</Button>
                  {allData.map((val, i) => (
                    <div className="exp-assay">
                      <div>{val}</div>
                      <Button onClick={() => handleDelete(i)}>X</Button>
                    </div>
                  ))} */}
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
        <label className="title-form">Search for Raw data annotations</label>
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
        />
      </div>
    </>
  );
};

export default RawDataAnnotations;
