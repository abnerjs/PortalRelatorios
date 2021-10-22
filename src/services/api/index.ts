import axios from 'axios';

import store from 'src/store';
import { logout } from 'src/store/ducks/login';

const api = axios.create({
  baseURL: 'http://datamob.servehttp.com:8080/Ester/ApiRestRelatorio/api',
});

api.interceptors.request.use(
  (request) => {
    const state = store.getState();
    const session = state.session;

    if (session.authenticated) {
      request.headers = {
        ...request.headers,
        Authorization: `Bearer ${session.user?.accessToken}`,
      };
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    if (response.status === 401) {
      store.dispatch(logout());
    }

    if (response.status === 403) {
    }

    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
