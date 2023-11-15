<template>
    <div class="card" style="width: 18rem;">
        <img :src="img" class="card-img-top" :alt="originalTitle">
        <div class="card-body">
            <h2 class="card-title">{{ title }}</h2>
            <h5 class="card-title">Original Title:{{ originalTitle }}</h5>
            <p class="card-text">Language:<span :class="'fi fi-'+language"></span></p>
            <p class="card-text">Grade: {{ grade }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CardComp',
    data() {
        return {

        }
    },
    props: {
        title: String,
        originalTitle: String,
        img: String,
        language: String,
        grade: Number,
    }
}
</script>

<style lang="scss" scoped></style>