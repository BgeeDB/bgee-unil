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

const arrayHelper = {
  chunked: chunkArray,
};

export default arrayHelper;
