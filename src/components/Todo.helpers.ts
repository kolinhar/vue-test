import { Task, TaskList } from "../assets/constantes";

const url_base = "http://localhost:3101";

const payload_base: RequestInit = {
    method: '',
    headers: { "Content-Type": "application/json", 'Accept': 'application/json' },
    body: "",
    mode: 'cors',
}

export const getDatas = (): Promise<TaskList> => {
    return fetch(`${url_base}/todos`)
        .then(res => {
            return res.json();
        });
}

export const addTodo = (datas: any): Promise<Task> => {
    const payload_post = {
        ...payload_base,
        method: 'POST',
        body: JSON.stringify(datas)
    };

    return fetch(`${url_base}/todos`, payload_post)
        .then(res => res.json())
        .then(json => json)
}

export const updTodo = (datas: Task): Promise<Task> => {
    const payload_post = {
        ...payload_base,
        method: 'PATCH',
        body: JSON.stringify(datas)
    };

    return fetch(`${url_base}/todos/${datas.id}`, payload_post)
        .then(res => res.json())
        .then(json => json);
}