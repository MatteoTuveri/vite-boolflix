<template>
  <div class="app d-flex flex-column position-relative">
    <header class="bg-black w-100 d-flex flex-column">
      <div class=" nav d-flex align-items-center py-3">
        <div class="col-2 d-flex justify-content-center">
          <h1 class="text-uppercase">
            boolflix
          </h1>
        </div>
        <div class="col-8">
          <div class="input-group">
            <span class="input-group-text border-0 bg-white" id="basic-addon1"><i class="fa-solid fa-magnifying-glass"
                style="color: #828487;"></i></span>
            <input type="text" class="form-control border-0 shadow-none" placeholder="Cerca un titolo"
              aria-label="Username" v-model="this.store.params.query" aria-describedby="basic-addon1"
              @keyup.enter="createLists">
            <span class="input-group-text border-0 bg-search text-white" id="basic-addon2"
              @click="createLists">Cerca</span>
          </div>
        </div>
        <div class="col-2 d-flex justify-content-center">
          <a href="#">
            <i class="fa-solid fa-user" style="color: #828487;"></i>
          </a>
          <a href="#">
            <i class="fa-solid fa-gear" style="color: #828487;"></i>
          </a>
          <a href="#">
            <i class="fa-solid fa-bell" style="color: #828487;"></i>
          </a>
        </div>
      </div>
      <div v-if="this.store.movieList.length === 0"
        class="px-5 w-75 m-auto d-flex flex-wrap justify-content-center text-white text-uppercase fw-bold">
        <div v-for="(item, index) in store.genresList" class="py-4 px-3 genres d-flex flex-column align-items-center position-relative"
          @click="setGenreFilt(item)">
          {{ item.name }}
        </div>
      </div>
    </header>
    <main class="flex-grow-1 overflow-auto p-4">
      <div v-if="this.store.movieList.length === 0">
        <h2 class="text-uppercase display-4 fw-bold text-white text-center mb-3">
          {{ store.activeGenre.name + ' ' }}Movies</h2>
        <div class="row">
          <div v-for="(item, index) in store.moviesFiltered"
            class="col-12 col-md-6 col-lg-4 col-xxl-2 px-4 d-flex justify-content-center">
            <CardComp :title="item.title" :original-title="item.original_title"
              :img="this.store.imagesUrl + item.poster_path" :language="item.original_language" :grade="item.vote_average"
              @info-card="openInfoCard(item)" />
          </div>
        </div>
        <h2 class="text-uppercase display-4 fw-bold text-white text-center mb-3">
          {{ store.activeGenre.name + ' ' }}Series</h2>
        <div class="row">
          <div v-for="(item, index) in store.seriesFiltered" class="col-12 col-md-6 col-lg-4 col-xxl-2 px-4 d-flex justify-content-center">
            <CardComp :title="item.name" :original-title="item.original_name"
              :img="this.store.imagesUrl + item.poster_path" :language="item.original_language" :grade="item.vote_average"
              @info-card="openInfoCard(item)" />
          </div>
        </div>
      </div>
      <div v-if="this.store.movieList.length !== 0">
        <h2 class="text-uppercase display-4 fw-bold text-white text-center mb-3">
          Movies</h2>
        <div class="row">
          <div v-for="(item, index) in store.movieList"
            class="col-12 col-md-6 col-lg-4 col-xxl-2 px-4 d-flex justify-content-center">
            <CardComp :title="item.title" :original-title="item.original_title"
              :img="this.store.imagesUrl + item.poster_path" :language="item.original_language" :grade="item.vote_average"
              @info-card="openInfoCard(item)" />
          </div>
        </div>
        <h2 class="text-uppercase display-4 fw-bold text-white text-center mb-3">
          Series</h2>
        <div class="row">
          <div v-for="(item, index) in store.seriesList"
            class="col-12 col-md-6 col-lg-4 col-xxl-2 px-4 d-flex justify-content-center">
            <CardComp :title="item.name" :original-title="item.original_name"
              :img="this.store.imagesUrl + item.poster_path" :language="item.original_language" :grade="item.vote_average"
              @info-card="openInfoCard(item)" />
          </div>
        </div>
      </div>
    </main>
    <div class="info-pg position-absolute" :class="(store.infoCard) ? 'd-flex' : 'd-none'">
      <CardInfoComp @close-info="closeInfoCard()" :open-close="infoComand" />
    </div>
  </div>
</template>

<script>
import CardComp from './components/CardComp.vue';
import CardInfoComp from './components/CardInfoComp.vue';
import { store } from './data/store';
import axios from 'axios';
export default {
  name: "App",
  data() {
    return {
      store,
      infoComand: 'close'
    };
  },
  methods: {
    setGenreFilt(item) {
      store.activeGenre = item
      if (item.id === 0) {
        this.getPopular()
      }
      else {
        //movies
        function movies() {
          return axios.get(store.apiUrl + store.endPoint.filterGenre.folder + store.endPoint.filterGenre.moviesEndPoint, { params: { api_key: store.params.apiKey, with_genres: item.id } })
        }
        //series
        function series() {
          return axios.get(store.apiUrl + store.endPoint.filterGenre.folder + store.endPoint.filterGenre.moviesEndPoint, { params: { api_key: store.params.apiKey, with_genres: item.id } })
        }
        Promise.all([movies(), series()]).then((results) => {
          const movies = results[0].data.results;
          store.moviesFiltered = movies
          const series = results[1].data.results;
          store.seriesFiltered = series
        });
      }
    },
    getGenres() {
      axios.get(store.apiUrl + store.endPoint.moviesForGenre, { params: { api_key: store.params.apiKey } }).then((result) => {
        const genres = result.data.genres;
        store.genresList = genres;
        store.genresList.unshift({
          id: 0,
          name: 'popular'
        })
      });
    },
    getPopular() {
      function movies() {
        return axios.get(store.apiUrl + store.endPoint.movieCast.folder + store.endPoint.movieCast.popular, { params: { api_key: store.params.apiKey } })
      }
      function series() {
        return axios.get(store.apiUrl + store.endPoint.tvCast.folder + store.endPoint.movieCast.popular, { params: { api_key: store.params.apiKey } })
      }
      Promise.all([movies(), series()]).then((results) => {
        const movies = results[0].data.results;
        store.moviesFiltered = movies
        const series = results[1].data.results;
        store.seriesFiltered = series
      });

    },
    getMovies() {
      return axios.get(store.apiUrl + store.endPoint.movies, { params: { api_key: store.params.apiKey, query: store.params.query } });
    },
    getSeries() {
      return axios.get(store.apiUrl + store.endPoint.series, { params: { api_key: store.params.apiKey, query: store.params.query } });
    },
    createLists() {
      Promise.all([this.getMovies(), this.getSeries()]).then((results) => {
        const movies = results[0].data.results;
        store.movieList = movies;
        const series = results[1].data.results;
        store.seriesList = series;
      });
    },
    openInfoCard(item) {
      store.activeItem = item;
      this.infoComand = 'close';
      store.infoCard = !store.infoCard
      setTimeout(() => {
        this.infoComand = 'open'
      }, 100);
    },
    closeInfoCard() {
      this.infoComand = 'close';
      setTimeout(() => {
        store.infoCard = !store.infoCard
      }, 550);
    }
  },
  components: { CardComp, CardInfoComp },
  mounted() {
    this.getGenres();
    this.getPopular();
  }
}
</script>

<style lang="scss" scoped>
.app {
  height: 100vh;
}

.nav {
  h1 {
    color: #e6111b;
  }

  a {
    font-size: 1.5em;
    margin: 0 10px;
  }
}

.bg-search {
  background-color: #e6111b;

}

main {
  background: rgb(75, 75, 75);
  background: linear-gradient(0deg, rgba(75, 75, 75, 1) 0%, rgba(2, 0, 36, 1) 78%);
}

.genres {
  cursor: pointer;
}

.genres::after {
  content: '';
  width: 100%;
  height: 5px;
  background-color: #e6111b;
  position: absolute;
  bottom: 0;
  transform: scaleX(0);
  transition: 0.5s;
}

.genres:hover::after {
  transform: scaleX(1);
  transition: 0.5s;
}

.bg-search:hover {
  cursor: pointer;
}

.info-pg {
  width: 100%;
  height: 100vh;
  top: 0px;
  z-index: 10000;
}
</style>