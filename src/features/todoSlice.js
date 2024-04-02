import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo(state, action) {
      state.todos = [
        { id: Date.now(), completed: false, title: action.payload },
        ...state.todos,
      ];
    },
    updateTodo: {
      prepare(id, title) {
        return { payload: { id, title } };
      },
      reducer(state, action) {
        state.todos = state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, title: action.payload.title }
            : todo
        );
      },
    },
    deleteTodo(state, action) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleComplete(state, action) {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    },
  },
});

export const localStorageMiddleware = ({ getState }) => {
  return (next) => (action) => {
    const result = next(action);
    localStorage.setItem("todos", JSON.stringify(getState()));
    return result;
  };
};

export const reHydrateStore = () => {
  if (localStorage.getItem("todos") !== null) {
    return JSON.parse(localStorage.getItem("todos"));
  }
};

export const { addTodo, updateTodo, deleteTodo, toggleComplete } =
  todoSlice.actions;

export default todoSlice.reducer;
