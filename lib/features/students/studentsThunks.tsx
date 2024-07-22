import { messageSuccess } from "@/components/message";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";
axios.defaults.withCredentials = true;

export const studentsThunks = {
  inviteStudents: createAsyncThunk(
    "students/inviteStudents",
    async (
      {
        emails,
        router,
        batchId,
      }: { emails: string[]; router: any; batchId: string },
      { rejectWithValue }
    ) => {
      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/batches/invitation/send-by-email/${batchId}`,
          emails
        );
        if (data.success) {
          messageSuccess(data.message);
          return false;
        }
      } catch (error: any) {
        console.error("Error Inviting Students:", error.response.data.message);
        return rejectWithValue(
          error.response.data.message ??
            "Error Inviting Students, please try again!"
        );
      }
    }
  ),
  verifyInviteCode: createAsyncThunk(
    "students/verifyInviteCode",
    async (
      {
        inviteCode,
        batchId,
        router,
      }: { inviteCode: string; batchId: string; router: any },
      { rejectWithValue }
    ) => {
      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/batches/invitation/verify-invite/${batchId}/${inviteCode}`
        );

        if (data.success) {
          messageSuccess(data.message);
          Cookies.remove("redirectUrl");
          router.push(`/batches/enrolled/${batchId}`);
          return false;
        }
      } catch (error: any) {
        console.error("Error Inviting Students:", error.response.data.message);
        router.push(`/batches/enrolled/${batchId}`);
        return rejectWithValue(
          error.response.data.message ??
            "Error Inviting Students, please try again!"
        );
      }
    }
  ),
  generateInviteCode: createAsyncThunk(
    "students/generateInviteCode",
    // TODO: this call is being done before need
    async ({ batchId }: { batchId: string }, { rejectWithValue }) => {
      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/batches/invitation/generate-invite/${batchId}`
        );
        if (data.success) {
          // messageSuccess(data.message);
          return data.inviteCode;
        }
      } catch (error: any) {
        console.error("Error Inviting Students:", error.response.data.message);
        return rejectWithValue(
          error.response.data.message ??
            "Error Inviting Students, please try again!"
        );
      }
    }
  ),
  getAllStudentsOfABatch: createAsyncThunk(
    "students/getAllStudentsOfABatch",
    async ({ batchId }: { batchId: string }, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/batches/students/${batchId}/all`
        );
        if (data.success) {
          return data.students;
        }
      } catch (error: any) {
        console.error("Error Getting Students:", error.response.data.message);
        return rejectWithValue(
          error.response.data.message ??
            "Error Getting Students, please try again!"
        );
      }
    }
  ),
  getAllBlockedStudentsOfABatch: createAsyncThunk(
    "students/getAllBlockedStudentsOfABatch",
    async ({ batchId }: { batchId: string }, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/batches/students/${batchId}/blocked/all`
        );
        if (data.success) {
          return data.students;
        }
      } catch (error: any) {
        console.error(
          "Error Getting Blocked Students:",
          error.response.data.message
        );
        return rejectWithValue(
          error.response.data.message ??
            "Error Getting Blocked Students, please try again!"
        );
      }
    }
  ),
  blockStudent: createAsyncThunk(
    "students/blockStudent",
    async (
      {
        batchId,
        studentId,
        note,
      }: { batchId: string; studentId: string; note?: string },
      { rejectWithValue }
    ) => {
      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/batches/students/${batchId}/${studentId}/block`,
          { note }
        );
        if (data.success) {
          return data.studentId;
        }
      } catch (error: any) {
        console.error("Error Blocking Student:", error.response.data.message);
        return rejectWithValue(
          error.response.data.message ??
            "Error Blocking Student, please try again!"
        );
      }
    }
  ),
  unblockStudent: createAsyncThunk(
    "students/unblockStudent",
    async (
      { batchId, studentId }: { batchId: string; studentId: string },
      { rejectWithValue }
    ) => {
      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/batches/students/${batchId}/${studentId}/unblock`
        );
        if (data.success) {
          messageSuccess(data.message);
          return data;
        }
      } catch (error: any) {
        console.error("Error Unblocking Student:", error.response.data.message);
        return rejectWithValue(
          error.response.data.message ??
            "Error Unblocking Student, please try again!"
        );
      }
    }
  ),
};
