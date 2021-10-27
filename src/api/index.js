import topAnat from './prod/topAnat';
import geneSearch from './prod/geneSearch';
import search from './prod/search';
import home from './prod/home';

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
  home,
};

export default api;
