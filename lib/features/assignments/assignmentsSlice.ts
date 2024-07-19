import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { assignmentThunks } from "./assignmentThunks";
import { messageError } from "@/components/message";

// Define a type for the slice state
interface assignmentsSlice {
  assignments: Array<any> | [];
  loading: boolean;
  error: string | null;
  singleAssignment?: object;
}

// Define the initial state using that type
const initialState: assignmentsSlice = {
  assignments: [],
  loading: false,
  error: null,
  singleAssignment: {
    name: "",
    _id: "",
    instructions: "",
    attachments: "",
  },
};

export const assignmentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        assignmentThunks.getSubmittedAssignmentByBatchId.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        assignmentThunks.getSubmittedAssignmentByBatchId.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.singleAssignment = action.payload;
        }
      )
      .addCase(
        assignmentThunks.getSubmittedAssignmentByBatchId.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          messageError(action.payload);
        }
      )
      .addCase(assignmentThunks.handInAsignment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        assignmentThunks.handInAsignment.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
        }
      )
      .addCase(
        assignmentThunks.handInAsignment.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          messageError(action.payload);
        }
      )
      .addCase(assignmentThunks.getAllAssignmentsByBatchId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        assignmentThunks.getAllAssignmentsByBatchId.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.assignments = action.payload;
        }
      )
      .addCase(
        assignmentThunks.getAllAssignmentsByBatchId.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          messageError(action.payload);
        }
      )
      .addCase(assignmentThunks.getAnAssignmentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        assignmentThunks.getAnAssignmentById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false; 
          state.singleAssignment = action.payload;
        }
      )
      .addCase(
        assignmentThunks.getAnAssignmentById.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          messageError(action.payload);
        }
      )
      .addCase(assignmentThunks.createAssignment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        assignmentThunks.createAssignment.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.assignments  = [...state.assignments, action.payload];
        }
      )
      .addCase(
        assignmentThunks.createAssignment.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          messageError(action.payload);
        }
      );
  },
});

export const {} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;
