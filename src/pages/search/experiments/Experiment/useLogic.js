import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../../api';

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

      const { attributes } = data.columnDescriptions[key];

      return attributes
        .map((attribute) => {
          const attributeParts = attribute.split('.');
          attributeParts.shift();
          return attributeParts.reduce((result, attr) => result[attr], cell);
        })
        .join(' ');
    },
    [data?.columnDescriptions]
  );

  const onFilter = useCallback(
    (keyword) => (row) => {
      const regExp = new RegExp(keyword, 'gi');
      return regExp.test(row?.id) || regExp.test(row?.library?.id);
    },
    []
  );

  return { data, columns, onRenderCell, onFilter };
};

export default useLogic;
