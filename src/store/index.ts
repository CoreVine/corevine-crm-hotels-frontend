import { configureStore } from "@reduxjs/toolkit";

import exampleReducer from "./slices/example.slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      example: exampleReducer
    }
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
