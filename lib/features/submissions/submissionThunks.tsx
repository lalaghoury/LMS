import { messageSuccess } from "@/components/message";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

export const submissionThunks = {
  getAllSubmissionsOfAnAssignment: createAsyncThunk(
    "submissions/getAllSubmissionsOfAnAssignment",
    async (
      { batchId, assignmentId }: { batchId: string; assignmentId: string },
      { rejectWithValue }
    ) => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/batches/submissions/all/${batchId}/${assignmentId}`
        );
        if (data.success) {
          messageSuccess(data.message);
          return data.submissions;
        }
      } catch (error: any) {
        console.error(
          "Error Getting Submissions:",
          error.response.data.message
        );
        return rejectWithValue(
          error.response.data.message ??
            "Error Getting Submissions, please try again!"
        );
      }
    }
  ),
  getASingleSubmissionById: createAsyncThunk(
    "submissions/getASingleSubmissionById",
    async (
      {
        batchId,
        assignmentId,
        submissionId,
      }: { batchId: string; assignmentId: string; submissionId: string },
      { rejectWithValue }
    ) => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/batches/submissions/single/${batchId}/${assignmentId}/${submissionId}`
        );
        if (data.success) {
          messageSuccess(data.message);
          return data.submission;
        }
      } catch (error: any) {
        console.error("Error Getting Submission:", error.response.data.message);
        return rejectWithValue(
          error.response.data.message ??
            "Error Getting Submission, please try again!"
        );
      }
    }
  ),
};
