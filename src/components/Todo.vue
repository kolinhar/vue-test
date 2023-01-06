<script type="module" lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { TaskList } from '../assets/constantes';
import { addTodo, getDatas } from './Todo.helpers';
import List from './List.vue';
import styles from './Todo.module.scss';
import { useTodoStore } from '../stores/Store.todo';
import { storeToRefs } from 'pinia';

export default defineComponent({
  components: {
    List,
  },
  async setup() {
    const title = 'Titre de la page';
    const todoTitle = 'Trucs à faire';
    const deleteTitle = 'Trucs supprimés';
    const doneTitle = 'Trucs terminés';
    // const todos = ref(new TaskList([]));
    const taskText = ref('');

    // todos.value = await getDatas();
    const todoStore = useTodoStore();
    todoStore.fill();

    /* handle enter key */
    const onKeyUpHandler = (e: any) => {
      if (e.keyCode === 13) {
        inputAdd();
      }
    };

    /* add a new task */
    const inputAdd = () => {
      const text = taskText.value.trim();

      if (text === '') {
        return;
      }

      todoStore.create(text)
        .then(() => {
          taskText.value = '';
        })
        .catch(console.error);
    };

    const inputChange = (e: Event) => {
      taskText.value = (e.target as HTMLInputElement).value;
    }

    return {
      title,
      todoTitle,
      styles,
      deleteTitle,
      doneTitle,
      taskText,
      onKeyUpHandler,
      todoStore,
      inputChange,
    };
  },
});
</script>

<template>
  <article :id="styles.app">
    <h1>{{ title }}</h1>

    <section>
      <label>
        Nouvelle tache
        <input type="text" :value="taskText" @input="inputChange" @keyup="onKeyUpHandler" placeholder="Ecrire ici" />
      </label>
    </section>

    <section>
      <list :title="todoTitle" :list="todoStore.getCurrentTasks" />
    </section>

    <section v-if="todoStore.getDoneTasks.length !== 0">
      <hr />
      <list :title="doneTitle" :list="todoStore.getDoneTasks" />
    </section>

    <section v-if="todoStore.getDeleteTasks.length !== 0">
      <hr />
      <list :title="deleteTitle" :list="todoStore.getDeleteTasks" />
    </section>
  </article>
</template>
