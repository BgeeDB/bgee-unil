/* eslint-disable import/prefer-default-export */
export const getIdAndNameLabel = (obj) =>
  `${obj?.id}${obj?.name ? ` - ${obj?.name}` : ''}`;
