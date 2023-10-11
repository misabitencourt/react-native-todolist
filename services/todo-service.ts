import { localStorageList } from "../repos/local-storage-list";

const repo = localStorageList('todo');

export type Todo = {
    id?: number;
    text: string;
    createdAt: Date;
};

export const validateTodo = async (todo: Todo) => {
    todo.text = todo.text.trim();
    if (!todo.text) {
        throw new Error(`Please, insert the text.`);
    }
}

export const listTodo = () => repo.listAll();

export const createTodo = (todo: Todo) => validateTodo(todo).then(() => repo.create(todo));

export const updateTodo = (todo: Todo) => validateTodo(todo).then(() => repo.update(todo));

export const destroyTodo = (id: number) => repo.destroy(id);

