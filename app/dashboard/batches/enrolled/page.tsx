"use client";

import { batchThunks } from "@/lib/features/batches/batchThunks";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import BatchesCard from "@/components/batches/BatchesCard";
import NoBatchesFoundCard from "@/components/batches/NoBatchesFoundCard";

const EnrolledBatches = () => {
  const dispatch = useAppDispatch();
  const { loading, batches } = useAppSelector((state) => state.batches);

  useEffect(() => {
    dispatch(batchThunks.getAllBatchesAsStudent());
  }, [dispatch]);

  if (loading) return <SkeletonCard />;

  if (batches.length === 0) return <NoBatchesFoundCard />;


  return (
    <div className="w-full h-full flex flex-wrap gap-4 py-2 ">
      {batches.map((batch: any) => (
        <BatchesCard batch={batch} route={`enrolled`} />
      ))}
    </div>
  );
};

export default EnrolledBatches;

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}
