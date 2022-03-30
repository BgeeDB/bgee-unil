/**
 * Returns an array with arrays of the given size.
 *
 * @param arr {Array} Array to split
 * @param chunkSize {Number} Size of every group
 * @param customOpts {Object|undefined} options to apply
 *        fillChunk {boolean} will fill the last chunk to match the chunk size
 *        defaultItemFactory {function} will generate an item to fill the chunk
 */

const chunkArray = (arr, chunkSize, customOpts) => {
  const options = {
    fillChunk: false,
    defaultItemFactory: undefined,
    ...(customOpts || {}),
  };
  const results = [];
  const tmp = JSON.parse(JSON.stringify(arr));

  while (tmp.length) {
    results.push(tmp.splice(0, chunkSize));
  }

  if (options.fillChunk) {
    while (results[results.length - 1].length < chunkSize) {
      let defaultItem;
      if (options.defaultItemFactory) {
        defaultItem = options.defaultItemFactory();
      }
      results[results.length - 1].push(defaultItem);
    }
  }

  return results;
};
const equalsIgnoreOrder = (a, b) => {
  if (a.length !== b.length) return false;
  const uniqueValues = new Set([...a, ...b]);
  // eslint-disable-next-line no-restricted-syntax
  for (const v of uniqueValues) {
    const aCount = a.filter((e) => e === v).length;
    const bCount = b.filter((e) => e === v).length;
    if (aCount !== bCount) return false;
  }
  return true;
};

const arrayHelper = {
  chunked: chunkArray,
  equals: equalsIgnoreOrder,
};

export default arrayHelper;
