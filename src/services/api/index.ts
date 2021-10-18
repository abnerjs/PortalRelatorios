import axios from 'axios';

const api = axios.create({
  baseURL: 'http://datamob.servehttp.com:8080/Ester/Relatorios/ApiRest/api',
});

export default api;
