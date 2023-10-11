import { Todo } from "../services/todo-service";


export type AppState = {
    loading: boolean;
    editingTodo?: Todo;
};

export const initialState = (): AppState => ({
    loading: true
}); 