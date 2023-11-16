<template>
<span class="mx-2" :class="'fi fi-' + langSet(language)"></span>
</template>

<script>
export default {
    data () {
        return {}
    },
    props:{
        language : String
    },
    methods: {
        langSet(language) {
            if (language === "en") {
                return "us";
            }
            else if (language === "ja") {
                return "jp";
            }
            else if (language === "ko") {
                return "kr";
            }
            else if (language === "zh") {
                return "cn";
            }
            else if (language === "hi") {
                return "in";
            }
            else {
                return language;
            }
        }
    },
}
</script>

<style lang="scss" scoped>

</style>