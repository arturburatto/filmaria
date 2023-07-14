//URL DA API:
//https://api.themoviedb.org/3/movie/now_playing?api_key=849e653cbddf47a8304cd89cb23fdc87&language=pt-BR
//base da url: https://api.themoviedb.org/3

import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
});

export default api;