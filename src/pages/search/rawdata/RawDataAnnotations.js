import React, { useState, useEffect, useMemo } from 'react';
import Select from 'react-select';
import api from '../../../api';
import Input from '../../../components/Form/Input';
import Button from '../../../components/Bulma/Button/Button';
import './rawDataAnnotations.scss';

const RawDataAnnotations = () => {
  const [speciesList, setSpeciesList] = useState([]);
  const [name, setName] = useState('');
  const [allData, setAllData] = useState([]);

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
  return (
    <>
      <div className="">
        Species
        <div className="selector">
          <Select options={metaKeywords} />
        </div>
        <div className="input-form">
          Experiment or assay ID
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Search experimentor or assay ID"
          />
          <Button onClick={handleAdd}>Add</Button>
          {allData.map((val, i) => (
            <div>
              <div>{val}</div>
              <Button onClick={() => handleDelete(i)}>X</Button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RawDataAnnotations;
