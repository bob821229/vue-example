<template>
    <n-auto-complete v-model:value="value" :input-props="{
        autocomplete: 'disabled'
    }" :options="options" placeholder="邮箱" clearable />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const value = ref('')
const options = computed(() => {
    return ['@gmail.com', '@163.com', '@qq.com'].map((suffix) => {
        const prefix = value.value.split('@')[0]
        return {
            label: prefix + suffix,
            value: prefix + suffix
        }
    })
})
</script>

<style scoped lang="scss"></style>