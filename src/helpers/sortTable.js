/* eslint-disable import/prefer-default-export */
export const monoSort =
  ({ key, sort }) =>
  ({ [key]: a }, { [key]: b }) => {
    const AFormatted = typeof a === 'string' ? a.toLowerCase() : a;
    const bFormatted = typeof b === 'string' ? b.toLowerCase() : b;
    if (AFormatted === bFormatted) return 0;
    if (sort === 'ascending') return AFormatted > bFormatted ? 1 : -1;
    if (sort === 'descending') return AFormatted < bFormatted ? 1 : -1;
    return 0;
  };

export const multiSort = (sortOpts) => (a, b) => {
  for (let i = 0; i < sortOpts.length; i += 1) {
    const diff = monoSort(sortOpts[i])(a, b);
    if (diff !== 0) return diff;
  }
  return 0;
};

const geneListObjFormatter = (o) => ({
  id: o.gene.id,
  name: o.gene.name,
  description: o.gene.description,
  organism: `${o.gene.species.genus} ${o.gene.species.speciesName}${
    o.gene.species.name ? ` (${o.gene.species.name})` : ''
  }`,
  match: o.match,
});
export const customGeneListSorter =
  (sortOpts) => (aNotFormatted, bNotFormatted) => {
    const a = geneListObjFormatter(aNotFormatted);
    const b = geneListObjFormatter(bNotFormatted);

    if (Array.isArray(sortOpts)) {
      for (let i = 0; i < sortOpts.length; i += 1) {
        const diff = monoSort(sortOpts[i])(a, b);
        if (diff !== 0) return diff;
      }
    } else {
      return monoSort(sortOpts)(a, b);
    }
    return 0;
  };

export const customAnatomicalHomologySorter = (sortOpts) => (a, b) => {
  if (Array.isArray(sortOpts)) {
    for (let i = 0; i < sortOpts.length; i += 1) {
      const diff = monoSort({
        ...sortOpts[i],
        key: `${sortOpts[i].key}Sorter`,
      })(a, b);
      if (diff !== 0) return diff;
    }
  } else {
    return monoSort({ ...sortOpts, key: `${sortOpts.key}Sorter` })(a, b);
  }
  return 0;
};
