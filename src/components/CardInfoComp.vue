<template>
    <div class="w-100 h-100 d-flex justify-content-center align-items-center"
        :class="(openClose === 'open') ? 'info-bg-on' : 'info-bg-off'">
        <div class="info-card overflow-hidden position-relative" :style="img" :class="openClose">
            <div class=" info-section d-flex flex-column justify-content-end p-5 text-white ">
                <h2 class="display-1 fw-bold mb-4">
                    {{ nameTitle }}
                </h2>
                <div>
                    <h5>
                        Overview:
                    </h5>
                    <p>
                        {{ store.activeItem.overview }}
                    </p>
                </div>
                <div class="d-flex">
                    <div>
                        Genre:
                    </div>
                    <div class="d-flex mx-1">
                        <div v-for="(item, index) in getGenre(store.activeItem.genre_ids)">
                            {{ item }} <span class="me-2"
                                v-if="index < getGenre(store.activeItem.genre_ids).length - 1">,</span>
                        </div>
                    </div>

                </div>
                <div class=" my-3 d-flex align-items-center">
                    <div>Language :</div>
                    <Lang :language="store.activeItem.original_language" />
                </div>
                <div class="d-flex align-items-center">
                    <div>
                        Ratings:
                    </div>
                    <Rating class="mx-3" :rate="grade" />
                    <div>
                        {{ store.activeItem.vote_count }}
                    </div>
                </div>
                <div>
                    <div>
                        Cast:
                    </div>
                    <div class="d-flex">
                        <div class="p-4" v-for="(item, index) in this.cast">
                            <div class="card" style="width: 10rem;">
                                <img :src="`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.img}`"
                                    class="card-img-top" :alt="item.name">
                                <div class="card-body">
                                    <h5>{{ item.name }}</h5>
                                    <p class="card-text">{{ item.character }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="close-button position-absolute d-flex justify-content-center align-items-center" @click="closeInfo">
                <i class="fa-solid fa-xmark fa-2xl"></i>
            </div>
        </div>
    </div>
    <!--     <VideoInfo :video-title="nameTitle" /> -->
</template>

<script>
import axios from 'axios';
import { store } from '../data/store';
import Lang from './InfoCom.vue/Lang.vue';
import Rating from './InfoCom.vue/Rating.vue';
import VideoInfo from './InfoCom.vue/VideoInfo.vue';
export default {
    name: "CardInfoComp",
    data() {
        return {
            store,
            cardTitle: '',
            cast: [],
            n: 1,
            cast: []
        };
    },
    props: {
        openClose: String
    },
    methods: {
        closeInfo() {
            this.$emit("closeInfo");
        },
        getGenre(array) {
            if (store.genresList.length !== 0 && store.activeItem.length !== 0) {
                let genlist = [];
                for (let i = 0; i < store.genresList.length; i++) {
                    if (array.includes(store.genresList[i].id)) {
                        genlist.push(store.genresList[i].name)
                    };
                }
                return genlist
            }
        },
        pushCast(res) {
            for (let i = 0; i < 5; i++) {
                if (res.data.cast[i]) {
                    this.cast.push({
                        name: res.data.cast[i].name,
                        img: res.data.cast[i].profile_path,
                        character: res.data.cast[i].character
                    })
                }
            }
        }

    },
    computed: {
        nameTitle() {
            if (store.activeItem.length !== 0) {
                //movies
                if (store.activeItem.title) {
                    console.log('film')
                    axios.get(store.apiUrl + store.endPoint.movieCast.folder + store.activeItem.id + store.endPoint.movieCast.endPoint, { params: { api_key: store.params.apiKey } }).then((res) => {
                        console.log(res)
                        if (this.cast.length === 0) {
                            this.pushCast(res)
                        }
                        else {
                            this.cast = []
                            this.pushCast(res)
                        }
                    })
                    return store.activeItem.title;
                }
                //tv
                else {
                    console.log('serie')
                    axios.get(store.apiUrl + store.endPoint.tvCast.folder + store.activeItem.id + store.endPoint.tvCast.endPoint, { params: { api_key: store.params.apiKey } }).then((res) => {
                        if (this.cast.length === 0) {
                            this.pushCast(res)
                        }
                        else {
                            this.cast = []
                            this.pushCast(res)
                        }
                    })
                    return store.activeItem.name;
                }
            }
        },
        img() {
            return `background-image :url(${this.store.imagesUrlXl + store.activeItem.poster_path});background-size:cover;background-position: center;`;
        },
        grade() {
            if (store.activeItem.vote_average) {
                return store.activeItem.vote_average;
            }
            else {
                return 0;
            }
        },

    },
    components: { Rating, Lang, VideoInfo }
}
</script>

<style lang="scss" scoped>
.info-bg-on {
    background-color: rgba(0, 0, 0, 0.5);
    transition: 0.5s;
}

.info-bg-off {
    background-color: rgba(0, 0, 0, 0);
    transition: 0.5s;
}

.close-button {
    top: 20px;
    right: 20px;
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid grey;
    color: gray;
    transition: 0.5s;
}

.close-button:hover {
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    transition: 0.5s;
}

.info-section {
    bottom: 0;
    height: 100%;
    width: 100%;
    background: rgb(0, 212, 255);
    background: linear-gradient(180deg, rgba(0, 212, 255, 0) 25%, rgba(2, 0, 36, 0.7) 40%);
}

.close {
    transform: scale(0);
    transition: 0.5s;
}

.open {
    transform: scale(1);
    transition: 0.5s;
}

.info-card {
    width: 50vw;
    height: 90vh;
    background-color: white;
    border-radius: 25px;
    z-index: 10001;
}
</style>