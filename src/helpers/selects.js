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

// Permet d'aller checher des valeurs enfant de l'objet envoyé
export const getChildValueFromAttribute = (obj = {}, attributes = '') => {
  // ex: ['result', 'experiment', 'name']
  const attributeTab = attributes.split('.');
  let current = obj;
  if (attributeTab[0] === 'result') {
    attributeTab.splice(0, 1);
  }
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < attributeTab.length; i++) {
    current = current?.[attributeTab[i]];
  }
  return current;
};
