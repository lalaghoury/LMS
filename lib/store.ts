import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import batchReducer from "./features/batches/batchSlice";
import studentsReducer from "./features/students/studentsSlice";
import assignmentsReducer from "./features/assignments/assignmentsSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      batches: batchReducer,
      students: studentsReducer,
      assignments: assignmentsReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
