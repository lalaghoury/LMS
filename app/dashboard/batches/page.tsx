"use client";

import { batchThunks } from "@/lib/features/batches/batchThunks";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Batches = () => {
  const dispatch = useAppDispatch();
  const { loading, batches } = useAppSelector((state) => state.batches);

  useEffect(() => {
    dispatch(batchThunks.getAllBatches());
  }, []);

  if (loading) return <SkeletonCard />;

  return (
    <div className="w-full h-full flex flex-wrap gap-4 py-2 ">
      {batches.map((batch: any) => (
        <div
          className="md:w-[400px] h-[350px] bg-slate-100 rounded-xl w-full dark:bg-slate-900 flex flex-col gap-2"
          key={batch._id}
        >
          <Image
            src={`https://picsum.photos/1200/300/?${batch.name}`}
            alt={batch.name}
            width={1200}
            height={160}
            className="rounded-xl !min-h-[160px]"
          />
          <div className="flex flex-col gap-2 p-3">
            <h1 className="text-3xl font-bold">{batch.name}</h1>
            <p className="text-sm font-semibold">
              Created by: {batch.owner.name}
            </p>
            <p className="text-sm font-semibold">
              No of students: {batch.students.length}
            </p>
            <Link
              href={`/dashboard/batches/${batch._id}`}
              className="text-sm font-semibold px-4 py-3 bg-blue-600 rounded-lg"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Batches;

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
