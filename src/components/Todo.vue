<script type="module">
import { defineComponent, ref, computed } from 'vue';
import List from './List.vue';
import { Tasks } from '../assets/constantes.ts';
import styles from './Todo.module.scss';

export default defineComponent({
  components: {
    List,
  },
  setup() {
    const title = 'Titre de la page';
    const todoTitle = 'Trucs à faire';
    const deleteTitle = ref('Trucs supprimés');
    const doneTitle = 'Trucs terminés';
    const todos = ref(Tasks);
    const taskText = ref("continuer d'écrire des histoires");

    /* current task list */
    const filteredTodos = computed(() =>
      todos.value.filter((x) => !x.done && !x.delete)
    );
    /* done task list */
    const doneTodos = computed(() =>
      todos.value.filter((x) => x.done && !x.delete)
    );
    /* deleted tasks list */
    const deleteTodos = computed(() => todos.value.filter((x) => x.delete));

    const inputChange = (e) => {
      taskText.value = e.target.value;
    };

    /* handle enter key */
    const onKeyUpHandler = (e) => {
      if (e.keyCode === 13) {
        inputAdd();
      }
    };

    /* add a new task */
    const inputAdd = () => {
      const lastElt = [...todos.value].pop();
      const text = taskText.value.trim();

      if (text === '') {
        return;
      }

      todos.value.push({
        id: lastElt.id + 1,
        text: taskText.value.trim(),
        done: false,
        delete: false,
      });

      taskText.value = '';
    };

    return {
      title,
      todoTitle,
      filteredTodos,
      styles,
      doneTodos,
      deleteTodos,
      deleteTitle,
      doneTitle,
      inputAdd,
      // inputChange,
      taskText,
      onKeyUpHandler,
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
        <!-- 
          
          @input="inputChange"
         -->
        <input
          type="text"
          :value="taskText"
          @model="taskText"
          @keyup="onKeyUpHandler"
          placeholder="Ecrire ici"
        />
        <!-- <button @click="inputAdd()">OK</button> -->
      </label>
    </section>

    <section>
      <list :title="todoTitle" :list="filteredTodos" />
    </section>

    <section v-if="doneTodos.length !== 0">
      <hr />
      <list :title="doneTitle" :list="doneTodos" />
    </section>

    <section v-if="deleteTodos.length !== 0">
      <hr />
      <list :title="deleteTitle" :list="deleteTodos" />
    </section>
  </article>
</template>
