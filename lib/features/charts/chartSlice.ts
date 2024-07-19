import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { messageError } from "@/components/message";
import { chartThunks } from "./chartThunks";

interface chartSlice {
  loading: boolean;
  error: string | null;
  batches: Array<any> | [];
  assignments: Array<any> | [];
  submissions: Array<any> | [];
}

const initialState: chartSlice = {
  loading: false,
  error: null,
  batches: [],
  assignments: [],
  submissions: [],
};

export const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(chartThunks.initialize.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        chartThunks.initialize.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.submissions = action.payload.submissions;
          state.assignments = action.payload.assignments;
          state.batches = action.payload.batches;
        }
      )
      .addCase(
        chartThunks.initialize.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          messageError(action.payload);
        }
      );
  },
});

export const {} = chartSlice.actions;

export default chartSlice.reducer;
