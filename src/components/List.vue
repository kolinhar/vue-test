<script type="module" lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { TaskList } from '../assets/constantes.ts';
import styles from './Todo.module.scss';

export default defineComponent({
  props: {
    title: String, // les props n'ont pas besoin d'être return à la fin du setup()
    list: Array, // il faut les typer avec des classes JS ou TS
    // dans ce cas, quand on type la prop list avec TaskList, Vue lève un warning parce qu'il reçoit un Array, ce qui est vrai en soi, mais c'est bien la classe TaskList qui est utilisée pour créer l'objet qu'il reçoit, voir avec les autres devs
  },
  setup({ title, list }: props) {
    return {
      styles, //oui, il faut même return le style 🤦‍♂️
    };
  },
});
</script>

<template>
  <ol>
    {{
      title || ''
    }}
    <li v-for="todo in list">
      <!-- @model permettent de faire rapidement du two ways data-binding -->
      <input type="checkbox" v-model="todo.done" />&nbsp;
      <span
        :class="{
          [styles.done]: todo.done,
          [styles.deleted]: todo.delete,
        }"
        >{{ todo.text }}</span
      >&nbsp;
      <button @click="todo.delete = !todo.delete">
        <span v-if="todo.delete">&#x261D;</span>
        <span v-else>&#x1F5D1;</span>
      </button>
    </li>
  </ol>
</template>
