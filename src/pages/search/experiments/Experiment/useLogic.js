import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../../api';
import LinkExternal from '../../../../components/LinkExternal';
import { COLUMN_TYPES } from '../../../../helpers/constants/columnDescriptions';
import obolibraryLinkFromID from '../../../../helpers/obolibraryLinkFromID';

const getColumnValues = (cell, attributes) =>
  attributes
    .map((attribute) => {
      const attributeParts = attribute.split('.');
      attributeParts.shift();
      return attributeParts.reduce((result, attr) => result[attr], cell);
    })
    .filter((x) => x !== undefined);

const useLogic = () => {
  const [data, setData] = useState();

  const { id: experimentId } = useParams();

  useEffect(() => {
    api.search.experiments.getExperiment(experimentId).then((response) => {
      if (response.status === 200) {
        setData(response.data?.data);
      }
    });
  }, [experimentId]);

  const columns = useMemo(
    () =>
      (data?.columnDescriptions || []).map((column, index) => ({
        key: index,
        text: column.title,
      })),
    [data?.columnDescriptions]
  );

  const onRenderCell = useCallback(
    ({ cell, key }) => {
      if (!data?.columnDescriptions) {
        return null;
      }

      const { attributes, columnType } = data.columnDescriptions[key];

      const values = getColumnValues(cell, attributes);

      switch (columnType) {
        case COLUMN_TYPES.DEV_STAGE:
        case COLUMN_TYPES.ANAT_ENTITY:
          return values.map((value, i) =>
            i % 2 === 0 ? (
              <span key={value}>
                <LinkExternal to={obolibraryLinkFromID(value)}>
                  {value}
                </LinkExternal>
                &nbsp;
              </span>
            ) : (
              value
            )
          );
        default:
          return values.join(' ');
      }
    },
    [data?.columnDescriptions]
  );

  const onFilter = useCallback(
    (keyword) => (row) => {
      const regExp = new RegExp(keyword.trim(), 'gi');

      return (data?.columnDescriptions || []).some(({ attributes }) => {
        const values = getColumnValues(row, attributes)?.join('');
        return regExp.test(values);
      });
    },
    [data?.columnDescriptions]
  );

  return { data, columns, onRenderCell, onFilter };
};

export default useLogic;
