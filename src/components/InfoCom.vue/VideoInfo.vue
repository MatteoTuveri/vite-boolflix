<template>
    <div class="position-relative video-size">
        <iframe width="1920" height="1080" :src="startVideo" frameborder="0"></iframe>
        <div class="pos-btn position-absolute w-100">
            <div class=" btn-pers d-flex justify-content-center align-items-center " @click="stopVideo">
                <i class="fa-solid fa-angle-left"></i>
            </div>
        </div>
        <div class="banner position-absolute w-100"></div>
    </div>
</template>

<script>
import { store } from '../../data/store';
import axios from 'axios';
export default {
    name: 'VideoInfo',
    data() {
        return {
            store,
            params: {
                part: 'snippet',
                key: 'AIzaSyDK0Hx6SrgNgVhKEzkCYY1tihjgegUQaT0',
                type: 'video',
                q: ''
            },
            videoId: '',
            videoUrl: ''
        }
    },
    props: {
        videoTitle: String
    },
    methods: {
        searchVideo(title) {
            this.params.q = title + ` Official Trailer`;
            axios.get('https://www.googleapis.com/youtube/v3/search', { params: this.params }).then((resp) => {
                this.videoId = resp.data.items[0].id.videoId
                this.videoUrl = `https://www.youtube.com/embed/${this.videoId}?&controls=0&rel=0&showinfo=0`
            });
        },
        stopVideo() {
            this.$emit('stopVideo')
        },
    },
    computed: {
        startVideo() {
            this.searchVideo(this.videoTitle)
            return this.videoUrl
        }
    }
}
</script>

<style lang="scss" scoped>
.video-size {
    z-index: 100;
    width: 1920px;
    height: 1080;
}

.pos-btn {
    top: 0px;
    left: 0px;
    padding-top: 20px;
    padding-left: 20px;
    height: 60px;
    z-index: 100;
    background: black; 
}

.banner{
    bottom: 0px;
    background-color: black;
    height: 60px;
}

.btn-pers {
    background-color: rgba(255, 255, 255, 0.5);
    height: 50px;
    width: 50px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.5em;
}

.btn-pers:hover {
    background-color: white;
}
</style>