import { configureStore } from "@reduxjs/toolkit";
import todoReducer, {
  localStorageMiddleware,
  reHydrateStore,
} from "./features/todoSlice";

const store = configureStore({
  reducer: { todo: todoReducer },
  preloadedState: reHydrateStore(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;
