import { useContext } from 'react';
import { TableContext } from '../../contexts/TableContext';

const TableHeader = () => {
  const { customHeader, searchInput, pageSizeSelector } =
    useContext(TableContext);

  return customHeader ? customHeader(searchInput, pageSizeSelector) : null;
};

export default TableHeader;
