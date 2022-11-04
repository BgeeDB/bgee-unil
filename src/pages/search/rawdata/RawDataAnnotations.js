import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Select from 'react-select';
import api from '../../../api';
import Input from '../../../components/Form/Input';
import Button from '../../../components/Bulma/Button/Button';
import Bulma from '../../../components/Bulma';
import AutoCompleteSearch from '../../../components/AutoCompleteSearch/AutoCompleteSearch';
import './rawDataAnnotations.scss';

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
  const [allData, setAllData] = useState([]);
  const [cFields, setCFields] = useState({ anat: true });
  const [dataType, setDataTypes] = useState(DATA_TYPES.map((d) => d.key));
  // const [showhide, setShowhide] = useState();

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
      return api.search.species.autoCompleteCellTypes(search).then((resp) => {
        if (resp.code === 200 && resp.data.matchCount !== 0) {
          return resp.data.match;
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

  const handleAdd = () => {
    if (name.length !== 0) {
      setAllData((newData) => [...newData, name]);
      setName('');
    }
  };

  const handleDelete = (i) => {
    allData.splice(i, 1);
    setAllData([...allData]);
  };

  const metaKeywords = useMemo(
    () =>
      speciesList.map((s) => ({
        label: `${s.genus.substr(0, 1)} ${s.speciesName} ${
          s.name ? `${s.name}` : ''
        }`,
        value: `${s.genus.substr(0, 1)} ${s.speciesName} ${
          s.name ? `${s.name}` : ''
        }`,
      })),
    [speciesList]
  );

  // const handleshowhide = (event) => {
  //   setShowhide(event.target.value);
  // };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="selector col-sm-6">
            <div className="mb-2">
              Species
              <Select
                options={metaKeywords}
                className="form-control"
                // onChange={(e) => handleshowhide(e)}
              />
            </div>
            {/* {!!showhide && ( */}
            <div>
              <div className="mb-2">
                Cell types
                {/* <Input type="text" placeholder="Search cell type" /> */}
                <AutoCompleteSearch
                  searchTerm={searchTerm}
                  placeholder="Search Gene"
                  renderOption={renderOption}
                  getOptionsFunction={getOptionsFunctionCellTypes}
                >
                  {children}
                </AutoCompleteSearch>
                <input type="checkbox" /> Including substrcutures
              </div>
              <div className="mb-2">
                Tissue
                <Input type="text" placeholder="Search tissue" />
                <input type="checkbox" /> Including substrcutures
              </div>
              <div>
                Development and life stage
                <Select />
                <input type="checkbox" /> Including substrcutures
              </div>
              <div>Sex</div>
              <div>
                <input type="checkbox" /> Male <input type="checkbox" /> Female{' '}
                <input type="checkbox" /> N/A
              </div>
            </div>
            {/* )} */}
          </div>
          <div className="col-md-6">
            <div className="input-form">
              <div className="mb-2">
                Strain
                <Input type="text" placeholder="Search tissue" />
                <input type="checkbox" /> Including substrcutures
              </div>
              <div className="mb-2">
                Gene
                {/* <Input type="text" placeholder="Search tissue" /> */}
                <AutoCompleteSearch
                  searchTerm={searchTerm}
                  placeholder="Search Gene"
                  renderOption={renderOption}
                  getOptionsFunction={getOptionsFunction}
                >
                  {children}
                </AutoCompleteSearch>
                <input type="checkbox" /> Including substrcutures
              </div>
              <div className="mb-2">
                Experiment or assay ID
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Search experimentor or assay ID"
                />
                <Button onClick={handleAdd}>Add</Button>
                {allData.map((val, i) => (
                  <div className="exp-assay">
                    <div>{val}</div>
                    <Button onClick={() => handleDelete(i)}>X</Button>
                  </div>
                ))}
              </div>
              <div className="is-flex is-flex-wrap-wrap gene-expr-fields-wrapper">
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
                <Bulma.Button
                  className="search-form"
                  disabled={
                    JSON.stringify(Object.keys(cFields).sort()) ===
                    JSON.stringify(CUSTOM_FIELDS.map((d) => d.key).sort())
                  }
                  onClick={() => {
                    const obj = {};
                    CUSTOM_FIELDS.forEach((c) => {
                      obj[c.key] = true;
                    });
                    setCFields(obj);
                  }}
                >
                  Select All
                </Bulma.Button>
                <Bulma.Button
                  className="search-form"
                  disabled={Object.keys(cFields).length === 0}
                  onClick={() => setCFields({})}
                >
                  Unselect All
                </Bulma.Button>
              </div>
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
              <div className="submit-reinit">
                <Button className="submit" type="submit">
                  Submit
                </Button>
                <Button className="reinit">Reinitialize</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RawDataAnnotations;
