<template>
    <div class="wrap">
        <AddTodo/>
        <TodoList/>
        {{ abc(2) }}
    </div>
</template>

<script setup lang="ts">
  import AddTodo from '@/components/AddTodo.vue';
  import TodoList from '@/components/TodoList.vue';
  import { onMounted ,computed, ref } from 'vue';
function abc(x:number){
  switch(x){
    case 1:
      return 'a';
    case 2:
      return 'b';
    default:
      return 'c';
  }
}
const data=ref(null)


</script>

<style scoped lang="scss">
  .wrap{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
</style>