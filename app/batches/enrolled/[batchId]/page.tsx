"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { batchThunks } from "@/lib/features/batches/batchThunks";
import Link from "next/link";

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
    dispatch(batchThunks.getABatchByIdAsStudent(batchId));
  }, [dispatch, batchId]);

  return (
    <div className="w-full px-2 flex flex-col gap-2">
      <div className="flex flex-col gap-4 py-2">
        <Image
          src={`https://picsum.photos/1200/300/?${batch?.name}`}
          alt={batch?.name}
          width={1200}
          height={300}
        />

        <h1 className="text-3xl font-bold">{batch?.name}</h1>

        <Link
          href={`/batches/enrolled/${batchId}/assignments`}
          className="w-fit"
        >
          <Button variant="ghost" size={"lg"} className="rounded-full">
            View Assignments
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default BatchDetailsPage;
