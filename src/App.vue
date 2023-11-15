<template>
  <div class="app d-flex flex-column">
    <header class="bg-black w-100">
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
            <input type="text" class="form-control border-0 shadow-none" placeholder="Cerca un titolo" aria-label="Username"
              v-model="this.store.params.query" aria-describedby="basic-addon1" @keyup.enter="createLists">
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
    </header>
    <main class="flex-grow-1 overflow-auto p-4">
      <h2 v-if="this.store.movieList.length !== 0" class="text-uppercase display-1 fw-bold text-white text-center mb-3">Movies</h2>
      <div class="row">
        <div v-for="(item, index) in this.store.movieList" class="col-2 d-flex justify-content-center">
          <CardComp :title="item.title" :original-title="item.original_title"
            :img="this.store.imagesUrl + item.poster_path" :language="item.original_language"
            :grade="item.vote_average" />
        </div>
      </div>
      <h2 v-if="this.store.movieList.length !== 0" class="text-uppercase display-1 fw-bold text-white text-center mb-3">Series</h2>
      <div class="row">
        <div v-for="(item, index) in this.store.seriesList" class="col-2 d-flex justify-content-center">
          <CardComp :title="item.name" :original-title="item.original_name"
            :img="this.store.imagesUrl + item.poster_path" :language="item.original_language"
            :grade="item.vote_average" />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import CardComp from './components/CardComp.vue';
import { store } from './data/store';
import axios from 'axios';
export default {
  name: "App",
  data() {
    return {
      store
    };
  },
  methods: {
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
        console.log(store.movieList);
      });
    }
  },
  components: { CardComp }
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
  background: rgb(75,75,75);
  background: linear-gradient(0deg, rgba(75,75,75,1) 0%, rgba(2,0,36,1) 78%);
}

.bg-search:hover {
  cursor: pointer;
}
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: none;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 25px;
  transition: 1s;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
  transition: 1s;
}
</style>