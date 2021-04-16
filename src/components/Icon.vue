<template>
    <div class="icon">
        <i class="material-icons">{{name}}</i>
    </div>
</template>

<script>
export default {
    name: 'icon',
    props: {
        name: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped>
.icon {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>