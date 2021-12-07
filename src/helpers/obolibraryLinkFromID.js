const obolibraryLinkFromID = (id) =>
  `http://purl.obolibrary.org/obo/${id.replace(':', '_')}`;

export const obolibraryNCBITaxonLinkFromID = (id) =>
  `http://purl.obolibrary.org/obo/NCBITaxon_${id}`;

export default obolibraryLinkFromID;
