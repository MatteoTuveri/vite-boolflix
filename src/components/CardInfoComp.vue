<template>
    <div class="w-100 h-100 d-flex justify-content-center align-items-center" :class="(openClose === 'open')?'info-bg-on':'info-bg-off'">
        <div class="info-card" :class="openClose" @click="closeInfo">
            

        </div>
    </div>
</template>

<script>
import { store } from '../data/store';
export default {
    name: 'CardInfoComp',
    data() {
        return {

        }
    },
    props: {
        openClose: String
    },
    methods: {
        closeInfo() {
            this.$emit('closeInfo')
        }
    },
}
</script>

<style lang="scss" scoped>

.info-bg-on{
    background-color: rgba(0, 0, 0, 0.3);
    transition: 1s;
}
.info-bg-off{
    background-color: rgba(0, 0, 0, 0);
    transition: 1s;
}
.close {
    transform: scale(0);
    transition: 1s;
}

.open {
    transform: scale(1);
    transition: 1s;
}

.info-card {
    width: 50vw;
    height: 90vh;
    background-color: white;
    border-radius: 25px;
    z-index: 10001;
}
</style>