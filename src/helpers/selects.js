/* eslint-disable import/prefer-default-export */
export const getIdAndNameLabel = (obj) =>
  `${obj?.id}${obj?.name ? ` - ${obj?.name}` : ''}`;

export const getOptionsForFilter = (
  values,
  shouldPrintId = true,
  shouldPrintName = true
) => {
  const shouldPrintBoth = shouldPrintId && shouldPrintName;
  const options = values?.map((v) => ({
    label: `${shouldPrintId ? v.id : ''}${shouldPrintBoth ? ' - ' : ''}${
      shouldPrintName ? v.name : ''
    }`,
    value: v.id,
  }));
  return options;
};
