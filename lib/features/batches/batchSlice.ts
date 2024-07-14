import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { batchThunks } from "./batchThunks";
import { messageError } from "@/components/message";

// Define a type for the slice state
interface batchSlice {
  batches: [object] | [];
  loading: boolean;
  error: string | null;
  singleBatch?: object;
}

// Define the initial state using that type
const initialState: batchSlice = {
  batches: [],
  loading: false,
  error: null,
  singleBatch: {
    name: "",
    
  },
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
      .addCase(batchThunks.getAllBatches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(batchThunks.editBatch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(batchThunks.deleteBatch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(batchThunks.getABatchById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        batchThunks.createBatch.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.batches.push(action.payload);
        }
      )
      .addCase(
        batchThunks.getAllBatches.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.batches = action.payload;
        }
      )
      .addCase(
        batchThunks.editBatch.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          const index = state.batches.findIndex(
            (batch) => batch._id === action.payload._id
          );
          state.batches[index] = action.payload;
        }
      )
      .addCase(
        batchThunks.deleteBatch.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.batches = state.batches.filter(
            (batch) => batch._id !== action.payload
          );
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
        batchThunks.createBatch.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          messageError(action.payload);
        }
      )
      .addCase(
        batchThunks.getAllBatches.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          messageError(action.payload);
        }
      )
      .addCase(
        batchThunks.editBatch.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          messageError(action.payload);
        }
      )
      .addCase(
        batchThunks.deleteBatch.rejected,
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
      );
  },
});

export const {} = batchSlice.actions;

export default batchSlice.reducer;
