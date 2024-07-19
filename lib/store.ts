import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import batchReducer from "./features/batches/batchSlice";
import studentsReducer from "./features/students/studentsSlice";
import assignmentsReducer from "./features/assignments/assignmentsSlice";
import submissionsReducer from "./features/submissions/submissionSlice";
import chartReducer from "@/lib/features/charts/chartSlice"

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      batches: batchReducer,
      students: studentsReducer,
      assignments: assignmentsReducer,
      submissions: submissionsReducer,
      chart: chartReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
