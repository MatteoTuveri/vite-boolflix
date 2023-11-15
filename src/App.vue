<template>
  <div class="bg-black w-100 nav d-flex align-items-center py-3">
    <div class="col-2 d-flex justify-content-center">
      <h1 class="text-uppercase">
        boolflix
      </h1>
    </div>
    <div class="col-8">
      <div class="input-group">
        <span class="input-group-text border-0 bg-white" id="basic-addon1"><i class="fa-solid fa-magnifying-glass"
            style="color: #828487;"></i></span>
        <input type="text" class="form-control border-0" placeholder="Cerca un titolo" aria-label="Username"
          aria-describedby="basic-addon1">
        <span class="input-group-text border-0 bg-search text-white" id="basic-addon2">Cerca</span>
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
</template>

<script>
import { store } from './data/store';
export default {
  name: 'App',
  data() {
    return {
      store
    }
  }
}
</script>

<style lang="scss" scoped>
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

.bg-search:hover {
  cursor: pointer;
}
</style>