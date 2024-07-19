"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { batchThunks } from "@/lib/features/batches/batchThunks";
import BatchesCard from "@/components/batches/BatchesCard";

interface BatchDetailsPageProps {
  params: {
    batchId: string;
  };
}

const BatchDetailsPage = ({ params }: BatchDetailsPageProps) => {
  const { batchId } = params;

  const dispatch = useAppDispatch();
  const { singleBatch: batch }: any = useAppSelector((state) => state.batches);

  useEffect(() => {
    dispatch(batchThunks.getABatchById(batchId));
  }, [dispatch, batchId]);

  return (
    <div className="w-full px-2 flex flex-col gap-2">
      <BatchesCard batch={batch} isTeacher={false} route={`enrolled`} />
    </div>
  );
};

export default BatchDetailsPage;
