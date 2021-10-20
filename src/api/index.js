import topAnat from './prod/topAnat';

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
};

export default api;
