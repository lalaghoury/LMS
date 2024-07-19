import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { messageError } from "@/components/message";
import { submissionThunks } from "./submissionThunks";

interface submissionSlice {
  loading: boolean;
  submissions: Array<any> | [];
  error: string | null;
  singleSubmission?: object | null;
}

const initialState: submissionSlice = {
  submissions: [],
  loading: false,
  error: null,
  singleSubmission: {},
};

export const submissionSlice = createSlice({
  name: "students",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        submissionThunks.getAllSubmissionsOfAnAssignment.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        submissionThunks.getAllSubmissionsOfAnAssignment.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.submissions = action.payload;
        }
      )
      .addCase(
        submissionThunks.getAllSubmissionsOfAnAssignment.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          messageError(action.payload);
        }
      )
      .addCase(submissionThunks.getASingleSubmissionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        submissionThunks.getASingleSubmissionById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.singleSubmission = action.payload;
        }
      )
      .addCase(
        submissionThunks.getASingleSubmissionById.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          messageError(action.payload);
        }
      );
  },
});

export const {} = submissionSlice.actions;

export default submissionSlice.reducer;
