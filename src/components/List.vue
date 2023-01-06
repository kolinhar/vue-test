<script setup lang="ts">
import { useTodoStore } from '../stores/Store.todo';
import { Task } from '../assets/constantes';
import styles from './Todo.module.scss';

const props = defineProps<{
  title: string,
  list: Task[],
}>();

const todoStore = useTodoStore();

const onDelete = (todo: Task): void => {
  todoStore.delete(todo);
}

const onDone = (todo: Task): void => {
  todoStore.done(todo);
}
</script>

<template>
  <ol>
    {{
  title || ''
    }}
      <!-- le ':key' est hyper important sinon comportement très étrange: quand on clique une checkbox elle disparait comme prévu, mais celle en-dessous remonte et à l'état checked -->
    <li v-for="todo in list" :key="todo.id">
      <label :class="{
        [styles.done]: todo.done,
        [styles.deleted]: todo.delete,
      }">
        <input type="checkbox" :checked="todo.done" @change="() => onDone(todo)" />&nbsp;
        {{ todo.text }}</label>
      <button @click="() => onDelete(todo)">
        <span v-if="todo.delete">&#x261D;</span>
        <span v-else>&#x1F5D1;</span>
      </button>
    </li>
  </ol>
</template>
