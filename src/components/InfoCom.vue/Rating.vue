<template>
    <div class="d-flex">
        <i v-for="n in gradeCalc(rate)" class="fa-solid fa-star"></i>
        <i v-for="n in (5 - gradeCalc(rate))" class="fa-regular fa-star"></i>
    </div>
</template>

<script>
export default {
    name:'Rating',
    data() {
        return {}
    },
    props: {
        rate: Number
    },
    methods:{
        gradeCalc(rate) {
            if (rate !== 0) {
                let newGrade = (rate / 10) * 5;
                return Math.ceil(newGrade)
            }
            else {
                return 0
            }
        },
    }
}
</script>

<style lang="scss" scoped></style>