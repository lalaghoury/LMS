import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { studentsThunks } from "./studentsThunks";
import { messageError } from "@/components/message";

// Define a type for the slice state
interface studentsSlice {
  students: Array<any> | [];
  blockedStudents: Array<any> | [];
  loading: boolean;
  error: string | null;
  singleStudent?: {} | null;
  code?: string;
}

// Define the initial state using that type
const initialState: studentsSlice = {
  students: [],
  blockedStudents: [],
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
      .addCase(studentsThunks.unblockStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        studentsThunks.unblockStudent.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.blockedStudents = state.blockedStudents.filter(
            (student) => student._id !== action.payload.studentId
          );
          state.students = action.payload.students;
        }
      )
      .addCase(
        studentsThunks.unblockStudent.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          messageError(action.payload);
        }
      )
      .addCase(
        studentsThunks.getAllBlockedStudentsOfABatch.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        studentsThunks.getAllBlockedStudentsOfABatch.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.blockedStudents = action.payload;
        }
      )
      .addCase(
        studentsThunks.getAllBlockedStudentsOfABatch.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          messageError(action.payload);
        }
      )
      .addCase(studentsThunks.blockStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        studentsThunks.blockStudent.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.students = state.students.filter(
            (student) => student._id !== action.payload
          );
        }
      )
      .addCase(
        studentsThunks.blockStudent.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          messageError(action.payload);
        }
      )
      .addCase(studentsThunks.getAllStudentsOfABatch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        studentsThunks.getAllStudentsOfABatch.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.students = action.payload;
        }
      )
      .addCase(
        studentsThunks.getAllStudentsOfABatch.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          messageError(action.payload);
        }
      )
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
