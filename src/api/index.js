import topAnat from './prod/topAnat';
import geneSearch from './prod/geneSearch';

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
  topAnat,
  geneSearch,
};

export default api;
