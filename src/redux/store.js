import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./slices/formSlice";

import logger from "redux-logger";

export const store = configureStore({
  reducer: { formState: formReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
