<template>
    <div class="app">
        <router-view />
    </div>
</template>

<script>
export default {
    created() {
        this.$store.dispatch('getNotes');
    },
}
</script>

<style lang="scss">
*,
*:before,
*:after {
    box-sizing: border-box;
}
body {
    background-color: #eee;
}
.app {
    margin: 30px;
}
.container {
    margin: 0 auto;
    max-width: 730px;
}
.mainBtn {
    display: inline-flex;
    padding: 0 18px;
    height: 38px;
    border-radius: 5px;
    background-color: #ddd;
    color: #000;
    text-align: center;
    text-decoration: none;
    font-size: 12px;
    line-height: 38px;
    align-items: center;
}
</style>
