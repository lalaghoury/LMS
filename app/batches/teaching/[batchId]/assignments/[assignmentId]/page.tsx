"use client";

import { assignmentThunks } from "@/lib/features/assignments/assignmentThunks";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface AssignmentDetailsPageProps {
  params: {
    assignmentId: string;
    batchId: string;
  };
}

const AssignmentDetailsPage = ({ params }: AssignmentDetailsPageProps) => {
  const { assignmentId, batchId } = params;

  const dispatch = useAppDispatch();
  const { singleAssignment: assignment }: any = useAppSelector(
    (state) => state.assignments
  );

  useEffect(() => {
    dispatch(
      assignmentThunks.getAnAssignmentById({
        assignmentId,
        batchId,
        route: "teaching",
      })
    );
  }, [assignmentId, dispatch]);

  if (!assignment) {
    return <div>Assignment not found</div>;
  }

  return (
    <div className="flex items-start justify-between w-full gap-5">
      <div className="flex flex-col w-full h-screen px-3 space-y-4">
        <div className="flex items-center justify-between py-2 border-b border-gray-300">
          <h1 className="text-2xl font-bold">{assignment?.title}</h1>
        </div>
        <div className="flex flex-col gap-4 py-2">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-gray-300">
              <Image
                src={assignment?.teacherId?.avatar}
                alt="Profile"
                width={48}
                height={48}
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <p className="font-bold">{assignment?.teacherId?.name}</p>
              <p className="text-sm text-gray-500">
                {assignment?.teacherId?.email}
              </p>
            </div>
          </div>
          <h1 className="text-2xl font-bold">Instructions: </h1>
          <p className="whitespace-pre-wrap">{assignment.instructions}</p>
        </div>
      </div>

      <div className="flex flex-col items-start justify-center space-y-4 min-w-[300px]">
        <div className="flex items-center gap-2">
          {assignment?.attachments.length > 0 && (
            <div className="flex items-start justify-center flex-col gap-2">
              <p className="text-lg font-bold">Attachments:</p>
              {assignment?.attachments.map((attachment: any, index: number) => (
                <a
                  key={index}
                  href={attachment.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {attachment.fileName}
                </a>
              ))}
            </div>
          )}
        </div>

        <Link
          href={`/batches/teaching/${batchId}/assignments/${assignment?._id}/submissions`}
        >
          <Button>View Submissions</Button>
        </Link>
      </div>
    </div>
  );
};

export default AssignmentDetailsPage;
