<template>
    <div class="w-100 card position-relative mb-4 overflow-hidden" style="width: 18rem;">
        <img :src="img" class="card-img-top" :alt="originalTitle">
        <div class="card-body position-absolute description d-flex flex-column justify-content-end w-100 h-100"
            @click="infoCard()">
            <h5 class="card-title">{{ title }}</h5>
            <span class="text-sub">{{ originalTitle }}</span>
            <div class="my-1"><span :class="'fi fi-' + langSet(language)"></span></div>
            <div class="d-flex">
                <i v-for="n in gradeCalc(grade)" class="fa-solid fa-star"></i>
                <i v-for="n in (5 - gradeCalc(grade))" class="fa-regular fa-star"></i>
            </div>
        </div>
    </div>
</template>

<script>
import { store } from '../data/store';
export default {
    name: 'CardComp',
    data() {
        return {
            store,
            n: 1
        }
    },
    methods: {
        gradeCalc(grade) {
            let newGrade = (grade / 10) * 5;
            return Math.ceil(newGrade)
        },
        langSet(language) {
            if (language === 'en') {
                return 'us'
            }
            else if (language === 'ja') {
                return 'jp'
            }
            else if (language === 'ko') {
                return 'kr'
            }
            else if (language === 'zh') {
                return 'cn'
            }
            else if (language === 'hi') {
                return 'in'
            }
            else {
                return language
            }
        },
        infoCard() {
            this.$emit('infoCard')
        }
    },
    props: {
        title: String,
        originalTitle: String,
        img: String,
        language: String,
        grade: Number,
    },
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