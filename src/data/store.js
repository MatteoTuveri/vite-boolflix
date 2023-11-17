import { reactive } from "vue";

export const store = reactive({
    apiUrl: 'https://api.themoviedb.org/3/',
    endPoint: {
        movies: 'search/movie',
        series: 'search/tv',
        moviesForGenre:'genre/movie/list',
        movieCast:{
            folder:'movie/',
            endPoint:'/credits',
            popular:'popular'
        },
        tvCast:{
            folder:'tv/',
            endPoint:'/credits',
            popular:'popular'
        },
        filterGenre:{
            folder:'discover/',
            moviesEndPoint:'movie',
            seriesEndPoint:'tv',
        }
    },
    params: {
        apiKey: 'ce9c620fce570ae78b7e22a8e754e124',
        query: '',
        genre:''
    },
    imagesUrl:'https://image.tmdb.org/t/p/w500/',
    imagesUrlXl:'https://image.tmdb.org/t/p/original/',
    activeGenre:{
        id:0,
        name:'popular'
    },
    infoCard:false,
    movieList: [],
    seriesList: [],
    moviesFiltered:[],
    seriesFiltered:[],
    genresList:[],
    activeItem:[]

});