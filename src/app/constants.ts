import { environment } from '../environments/environment';

/**
 * Constants.
 */

export const APP_NAME = 'Boiler project';

/**
 * Soundcloud api.
 */

export const API_BASE_URL = environment.apiBaseUrl;
export const SOUNDCLOUD_API_BASE_URL = environment.soundcloudProxyUrl;

export const CLIENT_ID = 'I16k8POQH5vn1kh8upgNMjkUs58RmGlg';
export const CLIENT_ID_PARAM = `client_id=${CLIENT_ID}`;

export const PAGINATION_LIMIT = 50;
export const PAGINATION_PARAMS = `limit=${PAGINATION_LIMIT}&linked_partitioning=1&offset=0`;

export const DEFAULT_USER_ID = '277705034';

export const DEFAULT_PLAY_LIST_URL = `${API_BASE_URL}/users/${DEFAULT_USER_ID}/favorites?${CLIENT_ID_PARAM}`;
export const SEARCH_QUERY_URL = `${SOUNDCLOUD_API_BASE_URL}/search/queries?${CLIENT_ID_PARAM}`;
export const TRACKS_QUERY_URL = `${API_BASE_URL}/tracks?${PAGINATION_PARAMS}&${CLIENT_ID_PARAM}`;
export const TRACK_QUERY_BY_ID_URL = `${API_BASE_URL}/tracks`;
