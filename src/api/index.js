import topAnat from './prod/topAnat';
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
  home,
};

export default api;
