import { defineStore } from 'pinia'
import { Task, TaskList } from '../assets/constantes'
import { addTodo, getDatas, updTodo } from '../components/Todo.helpers'

// You can name the return value of `defineStore()` anything you want, 
// but it's best to use the name of the store and surround it with `use` 
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useTodoStore = defineStore('TodoStore', {
    // other options...
    state: (): { todos: TaskList } => {
        return {
            todos: []
        }
    },
    getters: {
        getAllTasks: (state) => state.todos,
        getCurrentTasks: (state) => state.todos.filter(x => !x.done && !x.delete),
        getDoneTasks: (state) => state.todos.filter(x => x.done && !x.delete),
        getDeleteTasks: (state) => state.todos.filter(x => x.delete)
    },
    actions: {
        async fill() {
            this.todos = await getDatas()
        },
        async create(newTask: string) {
            await addTodo({
                text: newTask.trim(),
                done: false,
                delete: false
            }).then(res => {
                this.todos.push(res);
            }).catch(console.error);
        },
        async done(task: Task) {
            await updTodo({
                ...task,
                done: !task.done
            }).then(res => {
                this.todos = this.todos.map(x => {
                    if (x.id !== task.id) {
                        return x;
                    } else {
                        return res;
                    }
                })
            }).catch(console.error)
        },
        async delete(task: Task) {
            await updTodo({
                ...task,
                delete: !task.delete
            }).then(res => {
                this.todos = this.todos.map(x => {
                    if (x.id !== task.id) {
                        return x;
                    } else {
                        return res;
                    }
                })
            }).catch(console.error)
        }
    },
})