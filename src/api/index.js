import topAnat from './prod/topAnat';
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
};

export default api;
