<template>
     <button @click="searchVideo(videoTitle)"></button>
    <video src=""></video> 
</template>

<script>
import { store } from '../../data/store';
import axios from 'axios';
export default {
    name: 'VideoInfo',
    data() {
        return {
            store,
            params:{
                part: 'snippet',
                key: 'AIzaSyDK0Hx6SrgNgVhKEzkCYY1tihjgegUQaT0', 
                type: 'video', 
                q: '' 
            },
            videoId:'',
            videoUrl:''
        }
    },
    props:{
        videoTitle: String
    },
    methods: {
        searchVideo(title){
            console.log(title)
            this.params.q = title + ` Official Trailer`;
            console.log(this.params.q)
            axios.get('https://www.googleapis.com/youtube/v3/search', { params: this.params }).then((resp) => {
                console.log(resp)
                this.videoId = resp.data.items[0].id.videoId
                this.videoUrl = `https://www.youtube.com/embed/${this.videoId}?&controls=0&rel=0&showinfo=0`
                console.log(this.videoId)
            });
            console.log(this.videoUrl)
            return this.videoUrl
        } 
    },
}
</script>

<style lang="scss" scoped></style>