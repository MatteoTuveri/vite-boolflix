import { reactive } from "vue";

export const store = reactive({
    apiUrl: 'https://api.themoviedb.org/3/',
    endPoint: {
        movies: 'search/movie',
        series: 'search/tv'
    },
    params: {
        apiKey: 'ce9c620fce570ae78b7e22a8e754e124',
        query: 'a'
    },
    movieList: [],
    seriesList: [],

});