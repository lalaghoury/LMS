"use client";

import { batchThunks } from "@/lib/features/batches/batchThunks";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useEffect } from "react";
import BatchesCard from "@/components/batches/BatchesCard";
import NoBatchesFoundCard from "@/components/batches/NoBatchesFoundCard";

const EnrolledBatches = () => {
  const dispatch = useAppDispatch();
  const { batches } = useAppSelector((state) => state.batches);

  useEffect(() => {
    dispatch(batchThunks.getAllBatchesAsStudent());
  }, [dispatch]);

  if (batches.length === 0) return <NoBatchesFoundCard />;

  return (
    <div className="w-full h-full flex flex-wrap gap-4 py-2 ">
      {batches.map((batch: any) => (
        <BatchesCard key={batch._id} batch={batch} route={`enrolled`} />
      ))}
    </div>
  );
};

export default EnrolledBatches;
