import { configureStore } from "@reduxjs/toolkit";
import timeslotsReducer from "./timeSlots-slice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { companiesApi } from "./../services/companies";

const store = configureStore({
  reducer: {
    [companiesApi.reducerPath]: companiesApi.reducer,
    timeSlots: timeslotsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(companiesApi.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
