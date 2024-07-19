import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { batchThunks } from "./batchThunks";
import { messageError } from "@/components/message";

// Define a type for the slice state
interface batchSlice {
  batches: Array<any> | [];
  loading: boolean;
  error: string | null;
  singleBatch?: {} | null;
}

// Define the initial state using that type
const initialState: batchSlice = {
  batches: [],
  loading: false,
  error: null,
  singleBatch: {},
};

export const batchSlice = createSlice({
  name: "batches",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(batchThunks.createBatch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(batchThunks.getAllBatchesAsStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(batchThunks.getAllBatchesAsTeacherOrOwner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(batchThunks.getABatchById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(batchThunks.joinIntoBatchByBatchCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(batchThunks.getABatchByIdAsTeacherOrOwner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(batchThunks.getABatchByIdAsStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        batchThunks.createBatch.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.batches = [...state.batches, action.payload];
        }
      )
      .addCase(
        batchThunks.getAllBatchesAsStudent.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.batches = action.payload;
        }
      )
      .addCase(
        batchThunks.getAllBatchesAsTeacherOrOwner.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.batches = action.payload;
        }
      )
      .addCase(
        batchThunks.getABatchById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.singleBatch = action.payload;
        }
      )
      .addCase(
        batchThunks.joinIntoBatchByBatchCode.fulfilled,
        (state, action: PayloadAction<object>) => {
          state.loading = false;
          state.batches = [...state.batches, action.payload];
        }
      )
      .addCase(
        batchThunks.getABatchByIdAsTeacherOrOwner.fulfilled,
        (state, action: PayloadAction<object>) => {
          state.loading = false;
          state.singleBatch = action.payload;
        }
      )
      .addCase(
        batchThunks.getABatchByIdAsStudent.fulfilled,
        (state, action: PayloadAction<object>) => {
          state.loading = false;
          state.singleBatch = action.payload;
        }
      )

      .addCase(
        batchThunks.createBatch.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          messageError(action.payload);
        }
      )
      .addCase(
        batchThunks.getAllBatchesAsStudent.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          messageError(action.payload);
        }
      )
      .addCase(
        batchThunks.getAllBatchesAsTeacherOrOwner.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          messageError(action.payload);
        }
      )
      .addCase(
        batchThunks.getABatchById.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          messageError(action.payload);
        }
      )
      .addCase(
        batchThunks.joinIntoBatchByBatchCode.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          messageError(action.payload);
        }
      )
      .addCase(
        batchThunks.getABatchByIdAsTeacherOrOwner.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          messageError(action.payload);
        }
      )
      .addCase(
        batchThunks.getABatchByIdAsStudent.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          messageError(action.payload);
        }
      );
  },
});

export const {} = batchSlice.actions;

export default batchSlice.reducer;
