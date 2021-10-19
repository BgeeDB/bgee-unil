/* eslint-disable import/prefer-default-export */
import config from '../../config.json';

export const APP_VERSION = config.version.replaceAll('.', '_');
