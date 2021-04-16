<template>
    <div class="notebook">
        <div class="container">
            <router-link :to="{ name : 'home' }" replace class="mainBtn">返回列表</router-link>
            <div class="paper">
                <h1>{{noteName}}</h1>
                <Editor :id="id"></Editor>
            </div>
        </div>
    </div>
</template>

<script>
import Editor from '@/components/Editor.vue';

export default {
    name: 'notebook',
    components: {
        Editor
    },
    computed: {
        id() {
            return this.$route.params.id;
        },
        noteName() {
            return this.$store.state.notes[this.id].name;
        }
    },
}
</script>

<style lang="scss" scoped>
.mainBtn {
    margin-bottom: 30px;
}
.paper {
    padding: 2em;
    border-radius: 5px;
    background: #f8f8f8;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16);
}
h1 {
    margin-top: 0;
}
</style>