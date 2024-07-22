"use client";

import { Button } from "@/components/ui/button";
import { submissionThunks } from "@/lib/features/submissions/submissionThunks";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

interface AllAssinmentSubmissionDetailsPageProps {
  params: {
    batchId: string;
    assignmentId: string;
  };
}

const AllAssinmentSubmissionDetailsPage = ({
  params,
}: AllAssinmentSubmissionDetailsPageProps) => {
  const { batchId, assignmentId } = params;

  const dispatch = useAppDispatch();
  const { submissions } = useAppSelector((state) => state.submissions);

  useEffect(() => {
    dispatch(
      submissionThunks.getAllSubmissionsOfAnAssignment({
        batchId,
        assignmentId,
      })
    );
  }, [batchId, dispatch, assignmentId]);

  if (submissions.length === 0) {
    return <div>No submissions found</div>;
  }

  return (
    <>
      {submissions.map((sub) => (
        <div className="flex flex-col w-full space-y-4 px-4" key={sub._id}>
          <h1 className="text-2xl font-bold">{sub.assignmentId.title}</h1>

          <div className="flex gap-4 items-center justify-between">
            <div className="flex gap-2 items-center">
              <div className="w-12 h-12 rounded-full bg-gray-300">
                <Image
                  src={sub.assignmentId.teacherId.avatar}
                  alt="Profile"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <p className="font-bold">{sub.assignmentId.teacherId.name}</p>
                <p className="text-sm text-gray-500">
                  {sub.assignmentId.teacherId.email}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 py-2">
              <Link
                href={`/batches/enrolled/${batchId}/assignments/${assignmentId}/submissions/${sub._id}`}
              >
                <Button>View Submission Details</Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default AllAssinmentSubmissionDetailsPage;
