import topAnat from './prod/topAnat';
import geneSearch from './prod/geneSearch';
import search from './prod/search';

/*
 * ERROR RESPONSE FORMAT
 * {
 *    response: {
 *        data: {
 *            code,
 *            message,
 *            data: { exceptionType, invalidKey },
 *        },
 *    },
 * }
 */

const api = {
  search,
  topAnat,
  geneSearch,
};

export default api;
