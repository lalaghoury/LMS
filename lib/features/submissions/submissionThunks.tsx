import { messageSuccess } from "@/components/message";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

export const submissionThunks = {
  getAllSubmissionsOfAnAssignment: createAsyncThunk(
    "submissions/getAllSubmissionsOfAnAssignment",
    async (
      {
        batchId,
        assignmentId,
        router,
      }: { batchId: string; assignmentId: string; router: any },
      { rejectWithValue }
    ) => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/batches/submissions/teaching/all/${batchId}/${assignmentId}`
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
        if (
          error.response.data.message ===
          "You are not authorized to perform this action"
        ) {
          router.back();
        }
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
        router,
        route = "enrolled",
      }: {
        batchId: string;
        assignmentId: string;
        submissionId: string;
        router: any;
        route: string;
      },
      { rejectWithValue }
    ) => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/batches/submissions/${route}/single/${batchId}/${assignmentId}/${submissionId}`
        );
        if (data.success) {
          messageSuccess(data.message);
          return data.submission;
        }
      } catch (error: any) {
        console.error("Error Getting Submission:", error.response.data.message);
        if (
          error.response.data.message ===
          "You are not authorized to perform this action"
        ) {
          router.back();
        }
        return rejectWithValue(
          error.response.data.message ??
            "Error Getting Submission, please try again!"
        );
      }
    }
  ),
  updateGrade: createAsyncThunk(
    "submissions/updateGrade",
    async (
      {
        batchId,
        assignmentId,
        submissionId,
        router,
        grade,
      }: {
        batchId: string;
        assignmentId: string;
        submissionId: string;
        router: any;
        grade: string;
      },
      { rejectWithValue }
    ) => {
      try {
        const { data } = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/batches/submissions/update/${batchId}/${assignmentId}/${submissionId}`,
          { grade }
        );
        if (data.success) {
          messageSuccess(data.message);
          return data.submission;
        }
      } catch (error: any) {
        console.error("Error Updating Grade:", error.response.data.message);
        if (
          error.response.data.message ===
          "You are not authorized to perform this action"
        ) {
          router.back();
        }
        return rejectWithValue(
          error.response.data.message ??
            "Error Updating Grade, please try again!"
        );
      }
    }
  ),
};
