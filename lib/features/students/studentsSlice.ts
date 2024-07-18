import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { studentsThunks } from "./studentsThunks";
import { messageError } from "@/components/message";

// Define a type for the slice state
interface studentsSlice {
  students: [object] | [];
  loading: boolean;
  error: string | null;
  singleStudent?: object;
  code?: string;
}

// Define the initial state using that type
const initialState: studentsSlice = {
  students: [],
  loading: false,
  error: null,
  singleStudent: {
    name: "",
    _id: "",
    email: "",
  },
  code: "",
};

export const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(studentsThunks.generateInviteCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        studentsThunks.generateInviteCode.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.code = action.payload;
        }
      )
      .addCase(
        studentsThunks.generateInviteCode.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          messageError(action.payload);
        }
      )
      .addCase(studentsThunks.verifyInviteCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(studentsThunks.verifyInviteCode.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(
        studentsThunks.verifyInviteCode.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          messageError(action.payload);
        }
      )
      .addCase(studentsThunks.inviteStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(studentsThunks.inviteStudents.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(
        studentsThunks.inviteStudents.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          messageError(action.payload);
        }
      );
  },
});

export const {} = studentsSlice.actions;

export default studentsSlice.reducer;
