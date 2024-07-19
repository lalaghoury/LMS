"use client";

import { Button } from "@/components/ui/button";
import { assignmentThunks } from "@/lib/features/assignments/assignmentThunks";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

interface AllAssignmentsPageProps {
  params: {
    batchId: string;
  };
}

const AllAssignmentsPage = ({ params }: AllAssignmentsPageProps) => {
  const { batchId } = params;

  const dispatch = useAppDispatch();
  const { assignments }: any = useAppSelector((state) => state.assignments);
  const { user }: any = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(assignmentThunks.getAllAssignmentsByBatchId({ batchId }));
  }, [batchId, dispatch]);

  if (assignments.length === 0) {
    return <div>Assignments not found</div>;
  }

  return (
    <div className="flex flex-col w-full h-screen px-2">
      {assignments.map((assignment: any) => (
        <div key={assignment._id} className="mb-4">
          <div className="flex items-center justify-between py-2 border-b border-gray-300">
            <h1 className="text-2xl font-bold">{assignment.title}</h1>
            <div className="flex items-center gap-2">
              <a
                href={assignment.alternateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Open in Google
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-4 py-2">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-gray-300">
                <Image
                  src={assignment.teacherId.avatar}
                  alt="Profile"
                  width={48}
                  height={48}
                />
              </div>
              <div className="flex flex-col">
                <p className="font-bold">{assignment.teacherId.name}</p>
                <p className="text-sm text-gray-500">
                  {assignment.teacherId.email}
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-center justify-between">
              <p className="whitespace-pre-wrap">{assignment.instructions}</p>
              <div className="flex gap-2 items-center">
                <Link
                  href={`/dashboard/batches/${batchId}/assignments/${assignment._id}`}
                >
                  <Button>View Details</Button>
                </Link>
                {assignment.teacherId._id === user._id && (
                  <Link
                    href={`/dashboard/batches/${batchId}/assignments/${assignment._id}/submissions`}
                  >
                    <Button>View Submissions</Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllAssignmentsPage;
