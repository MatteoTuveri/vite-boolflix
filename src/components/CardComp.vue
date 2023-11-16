<template>
    <div class="w-100 card position-relative mb-4 overflow-hidden" style="width: 18rem;">
        <img :src="img" class="card-img-top" :alt="originalTitle">
        <div class="card-body position-absolute description d-flex flex-column justify-content-end w-100 h-100"
            @click="infoCard()">
            <h5 class="card-title">{{ title }}</h5>
            <span class="text-sub">{{ originalTitle }}</span>
            <Lang class="mb-2" :language="language"/>
            <Rating :rate="gradeC" />
        </div>
    </div>
</template>

<script>
import { store } from '../data/store';
import Lang from './InfoCom.vue/Lang.vue';
import Rating from './InfoCom.vue/Rating.vue';
export default {
    name: "CardComp",
    data() {
        return {
            store,
            n: 1
        };
    },
    methods: {
        infoCard() {
            this.$emit("infoCard");
        }
    },
    props: {
        title: String,
        originalTitle: String,
        img: String,
        language: String,
        grade: Number,
    },
    computed: {
        gradeC() {
            if (this.grade) {
                return this.grade;
            }
            else {
                return 0;
            }
        }
    },
    components: { Rating, Lang }
}
</script>

<style lang="scss" scoped>
.card {
    transform: scale(1);
    transition: 1s;
}

.card:hover {
    transform: scale(1.05);
    transition: 1s;
}

.description {
    color: white;
    bottom: 0px;
    background: rgb(0, 212, 255);
    background: linear-gradient(180deg, rgba(0, 212, 255, 0) 0%, rgba(2, 0, 36, 0.6110819327731092) 40%);
    opacity: 0;
    transition: 1s;
    cursor: pointer;
}

.description:hover {
    opacity: 1;
    transition: 1s;

}

.card-img-top {
    height: 100%;
}

.text-sub {
    color: rgb(255, 255, 255, 0.5);
}
</style>